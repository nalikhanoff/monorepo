export async function createProduct(product) {
  const res = await fetch('/api/products', {
    method: 'POST',
    body: JSON.stringify(product),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!res.ok) throw new Error('Failed to create product');

  return res.json();
}

export async function updateProduct(product) {
  const res = await fetch('/api/products', {
    method: 'PUT',
    body: JSON.stringify(product),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!res.ok) return;

  return res.json();
}

export async function deleteProduct(id) {
  const res = await fetch(`/api/products?id=${id}`, { method: 'DELETE' });
  if (!res.ok) return;

  return res.json();
}
