export function checkEnterCount(e: React.ChangeEvent<HTMLTextAreaElement>) {
  return e.target.value.split("\n").length;
}
