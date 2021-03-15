export class Library {
    public async addBook(book: string): Promise<void> {
        console.log('Added book', book);
    }
}