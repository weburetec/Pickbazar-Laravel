export function calculateTotal(
  amount: number,
  tax: number,
  shipping_charge: number
) {
  return amount + tax + shipping_charge;
}
