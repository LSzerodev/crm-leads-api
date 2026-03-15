import mongoose, { type PipelineStage } from 'mongoose';
import type { LeadDoc } from '../../../interfaces';

type Match = mongoose.QueryFilter<LeadDoc>;
type Status = 'em andamento' | 'Finalizado' | 'Recusado';
type ContactField = 'email' | 'phone';
type GroupField = '$stage_actual' | '$stage_status' | '$indication';

function countWhen(condition: Record<string, unknown>) {
  return {
    $sum: {
      $cond: [condition, 1, 0],
    },
  };
}

function countStatus(status: Status) {
  return countWhen({ $eq: ['$stage_status', status] });
}

function hasValue(field: ContactField) {
  return {
    $and: [
      { $ne: [`$${field}`, null] },
      { $ne: [`$${field}`, ''] },
    ],
  };
}

function isEmpty(field: ContactField) {
  return {
    $or: [
      { $eq: [`$${field}`, null] },
      { $eq: [`$${field}`, ''] },
    ],
  };
}

function groupBy(field: GroupField): PipelineStage.FacetPipelineStage[] {
  return [
    {
      $group: {
        _id: field,
        total: { $sum: 1 },
      },
    },
  ];
}

/**
 * Monta o pipeline do dashboard em partes pequenas.
 * Use esse helper quando o service precisar apenas executar a agregacao,
 * sem carregar a regra do Mongo inteira no mesmo arquivo.
 */
export function buildDashPipe(match: Match): PipelineStage[] {
  return [
    {
      $match: match,
    },
    {
      // `$facet` executa varias agregacoes de uma vez sobre o mesmo conjunto filtrado.
      $facet: {
        summary: [
          {
            $group: {
              _id: null,
              total: { $sum: 1 },
              in_progress: countStatus('em andamento'),
              closed: countStatus('Finalizado'),
              refused: countStatus('Recusado'),
              with_email: countWhen(hasValue('email')),
              without_email: countWhen(isEmpty('email')),
              with_phone: countWhen(hasValue('phone')),
              without_phone: countWhen(isEmpty('phone')),
              latest_created_at: {
                $max: '$created_at',
              },
              latest_updated_at: {
                $max: '$updated_at',
              },
            },
          },
        ],
        by_stage: groupBy('$stage_actual'),
        by_status: groupBy('$stage_status'),
        by_indication: groupBy('$indication'),
      },
    },
  ];
}
