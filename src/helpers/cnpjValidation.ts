export function isValidCNPJ(cnpj: string): boolean {
  cnpj = cnpj.replace(/[^\d]+/g, '');

  if (cnpj.length !== 14) return false;

  if (/^(\d)\1+$/.test(cnpj)) return false;

  const t = cnpj.length - 2;
  const d = cnpj.substring(t);
  const d1 = parseInt(d.charAt(0));
  const d2 = parseInt(d.charAt(1));
  const calc = (x: number) => {
    let n = 0;
    let y = x - 7;
    for (let i = x; i >= 1; i--) {
      n += parseInt(cnpj.charAt(x - i)) * y--;
      if (y < 2) y = 9;
    }
    return 11 - (n % 11) >= 10 ? 0 : 11 - (n % 11);
  };

  return calc(t) === d1 && calc(t + 1) === d2;
}
