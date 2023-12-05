interface layoutProps {
  min: number;
  itemQty: number;
}

function getItemQty(width: number, layouts: layoutProps[]) {
  let itemQty: number | null = null;

  const sortedLayouts = [...layouts].sort((a, b) => b.min - a.min);

  for (const layout of sortedLayouts) {
    if (width >= layout.min) {
      itemQty = layout.itemQty;
      break;
    }
  }

  return itemQty;
}

export default getItemQty;
