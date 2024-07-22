const getCategoryFromTags = (tags: string[]) =>
  tags.find((tag) => /category/.test(tag))?.replace("category:", "");

export default getCategoryFromTags;
