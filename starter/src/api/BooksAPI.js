const api = "https://reactnd-books-api.udacity.com";

const requsets = {
  bookById: (id) => `${api}/books/${id}`,
  getBooks: `${api}/books`,
  searchBooks: `${api}/search`,
};

let token = localStorage.token;
if (!token) token = localStorage.token = Math.random().toString(36).substr(-8);

const headers = {
  Accept: "application/json",
  Authorization: token,
};

export const getBooks = async ({ options }) =>
  await fetch(requsets.bookById(options.bookId), { ...options, headers });

export const getAllBooks = ({ options }) =>
  fetch(requsets.getBooks, { ...options, headers });

export const updateBook = async ({ body: { shelf }, options: { book: id } }) =>
  await fetch(requsets.bookById(id), {
    method: "PUT",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ shelf }),
  });

export const searchBooks = async ({ body: { query, maxResults } }) => {
  console.log(query);
  return await fetch(requsets.searchBooks, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, maxResults }),
  });
};
