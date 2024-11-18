export default function CardPost({ title, image, content, tags, category }) {
    return (
        <div className="relative w-full max-w-[500px] h-[700px] bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
            {/* Category */}
            <div className="absolute top-2 left-0">
                <span
                    className="inline-block text-white uppercase bg-[#b52c0a] px-2.5 py-1 font-bold rounded-r-full
                    text-[0.9em] transition-all duration-300 ease-in-out cursor-pointer hover:bg-[#9f2608] hover:-translate-y-0.5"
                >
                    {category}
                </span>
            </div>

            <div className="w-full h-[70%]">
                {image && (
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover"
                    />
                )}
            </div>
            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
                <h4 className="text-gray-800 truncate mb-2">{content}</h4>
                <p>
                    {tags.length > 0
                        ? tags.map((tag, index) => (
                              <span
                                  key={index}
                                  className="inline-block text-[#333] bg-[#cfef00] mr-2 px-2.5 py-1 my-1 font-bold rounded-full text-[0.9em] transition-all duration-300 ease-in-out cursor-pointer hover:bg-[#b5d900] hover:-translate-y-0.5"
                              >
                                  #{tag}
                              </span>
                          ))
                        : "Nessun tag"}
                </p>
            </div>
        </div>
    );
}
