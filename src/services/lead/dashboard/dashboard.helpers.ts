import type { DashBucket } from '../../../interfaces';

function toTotalMap(rows: DashBucket[]) {
  // `Map` guarda pares de chave/valor. Aqui a chave e o nome do bucket
  // e o valor e o total, para buscar cada label rapidamente sem percorrer
  // a lista inteira toda vez.
  return new Map(rows.map((row) => [row._id, row.total]));
}

/**
 * Garante que toda categoria esperada apareca na resposta.
 * Use quando o Mongo pode omitir grupos sem registro e voce quer devolver `0`.
 */
export function fillTotals(labels: readonly string[], rows: DashBucket[]) {
  const totals = toTotalMap(rows);

  return labels.map((label) => ({
    label,
    total: totals.get(label) ?? 0,
  }));
}
