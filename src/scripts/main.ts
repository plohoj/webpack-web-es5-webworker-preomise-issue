import { Library } from "./common";

new Library().addBook('Book №1');

new Worker(new URL('./worker', import.meta.url));
