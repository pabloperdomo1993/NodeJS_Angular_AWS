export class CreatePostDto {
  id: number;
  title: string;
  message: string;
  createAt: Date | string;
  email: string;
}
