export default function validateJsonStructure(data: unknown): boolean {
  try {
    JSON.parse(JSON.stringify(data));
    return true;
  } catch (error) {
    console.log("invalid Json structure : ", error);
    return false;
  }
}
