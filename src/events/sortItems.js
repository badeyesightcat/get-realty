// Sorting list items in characters order : 주소 목록의 가나다순 정렬
const sortItems = (itemsArray) => {
  itemsArray.sort((a, b) => {
    return a.title.localeCompare(b.title);
  });
  return itemsArray;
};

export default sortItems;
