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
    <div className="bg-green-200 h-screen w-screen p-4 sm:p-8 md:p-16 flex justify-center items-center">
      <div className="relative top-[150px] sm:top-[0px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className="card bg-base-100 image-full shadow-lg cursor-pointer transition-transform transform hover:scale-105"
            onClick={() => handleNavigation(category.title)}
          >
            <figure>
              <img
                src={category.imgSrc}
                alt={category.title}
                className="object-cover w-[200px] sm:w-full 2xl:h-48 md:h-60 lg:h-72"
              />
            </figure>
            <div className="card-body p-4">
              <h2 className="card-title text-lg sm:text-xl md:text-2xl font-bold">
                {category.title}
              </h2>
              <p className="text-sm sm:text-base md:text-lg">
                {category.description}
              </p>
              <div className="card-actions justify-end mt-4">
                <button className="btn btn-primary px-4 py-2 text-sm sm:text-base md:text-lg">
                  See Algorithms
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryGrid;
