export function filterTwoLayer(array) {
  let temp = array.filter((item) => item.pid == 0);
  temp.forEach(
    (item) => (item.children = array.filter((it) => it.pid == item.id))
  );
  return temp;
}
