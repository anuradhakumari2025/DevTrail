import axios from "axios";

// utils/fun.jsx
export function getFilteredTagsAndParams(
  tags,
  filterParentTag,
  filterChildTag,
  filterCategory
) {
  const params = new URLSearchParams();

  const parentTags = tags.filter((tag) => tag.parent === null);
  const childTags = tags.filter(
    (tag) => tag.parent && tag.parent._id === filterParentTag
  );

  if (filterCategory && filterCategory !== "All")
    params.append("category", filterCategory);
  if (filterParentTag && filterParentTag !== "ALL")
    params.append("parentTag", filterParentTag);
  if (filterChildTag && filterChildTag !== "ALL")
    params.append("childTag", filterChildTag);

  return { parentTags, childTags, params };
}

export const fetchJournals = async (url, setEntries) => {
  try {
    const res = await axios.get(url);
    setEntries(res.data.journals);
  } catch (err) {
    // handle error
    console.error("Error fetching journals:", err);
  }
};
