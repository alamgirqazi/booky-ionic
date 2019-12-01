export class BookyConfig {
  private static path = 'http://localhost:3000';

  public static getPath(): string {
    return BookyConfig.path;
  }
}
