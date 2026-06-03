import { useMemo } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useSubCategories } from "./hooks/useSubCategories";

const CategorySidebar = ({ categories, selected, onSelect }) => {
  const { subCategories } = useSubCategories();

  const subsByCategoryId = useMemo(() => {
    const map = {};
    subCategories.forEach((sub) => {
      const catId = sub.category?._id || sub.category;
      if (!catId) return;
      if (!map[catId]) map[catId] = [];
      map[catId].push(sub);
    });
    return map;
  }, [subCategories]);

  return (
    <div className="w-[220px]">
      <h3 className="text-[#004B73] font-semibold text-sm mb-4">Categories</h3>

      <p
        onClick={() => onSelect("")}
        className={`text-sm mb-4 cursor-pointer ${
          !selected ? "text-[#F4A911] font-medium" : "text-gray-600"
        }`}
      >
        All Categories
      </p>

      {categories.map((cat) => {
        const subs = subsByCategoryId[cat._id] || [];

        return (
          <Accordion
            key={cat._id}
            elevation={0}
            disableGutters
            sx={{
              background: "transparent",
              boxShadow: "none",
              "&:before": { display: "none" },
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <span className="text-sm">{cat.name}</span>
            </AccordionSummary>

            <AccordionDetails>
              {subs.length === 0 ? (
                <p className="text-xs text-gray-400">No sub categories</p>
              ) : (
                <div className="space-y-2">
                  {subs.map((sub) => (
                    <label
                      key={sub._id}
                      className="flex items-center gap-2 text-sm cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selected === sub._id}
                        onChange={() =>
                          onSelect(selected === sub._id ? "" : sub._id)
                        }
                      />
                      {sub.name}
                    </label>
                  ))}
                </div>
              )}
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
};

export default CategorySidebar;
