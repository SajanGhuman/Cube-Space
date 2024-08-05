"use client";
import { useRouter } from "next/navigation";

const categories = [
  {
    id: 1,
    title: "F2L",
    description:
      "First 2 Layers: This step involves inserting “pairs” of corners and edges into the spaces around the four edges dependent on the centres",
    imgSrc: "f2l.svg",
  },
  {
    id: 2,
    title: "OLL",
    description:
      "Orientation of the Last Layer: It is the third step in the CFOP Method. During the OLL step, the goal is to orient all the pieces on the last layer so that the top face of the cube is a single solid color",
    imgSrc: "oll.svg",
  },
  {
    id: 3,
    title: "PLL",
    description:
      "Permutation of the Last Layer: After doing OLL to solve the top face, you do a PLL algorithm to solve the rest of the cube",
    imgSrc: "pll.svg",
  },
];

const CategoryGrid = () => {
  const router = useRouter();

  const handleNavigation = (categoryTitle: string) => {
    const lowerCaseTitle = categoryTitle.toLowerCase();
    router.push(`/algorithms/${lowerCaseTitle}`);
  };

  return (
    <div className="bg-green h-screen  w-screen p-16 flex justify-center items-center cursor-pointer">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className="card bg-base-100 image-full shadow-xl"
            onClick={() => handleNavigation(`${category.title}`)}
          >
            <figure>
              <img src={category.imgSrc} alt={category.title} />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{category.title}</h2>
              <p>{category.description}</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">See Algorithms</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryGrid;
