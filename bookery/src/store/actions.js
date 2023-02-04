import store from "../store";
export function searchBooks({ commit }, keyword) {
  console.log("keyword" + keyword.value);
  let filteredBooks = store.state.searchedBooks.filter((book) =>
    book.title.toLowerCase().includes(keyword.value.toLowerCase())
  );
  store.commit("setSearchedBooks", filteredBooks);

}
