import React, { useRef, useState, useEffect } from 'react';

const TasteCarousel = ({ items }) => {
  const scrollRef = useRef(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    let animationId;
    const scrollContainer = scrollRef.current;

    const play = () => {
      if (!scrollContainer || isDown || isHovering) {
        animationId = requestAnimationFrame(play);
        return;
      }

      // Adjust speed here
      scrollContainer.scrollLeft += 1;

      // When we scroll exactly past the first set of items (which is half the scrollWidth)
      // we snap back to the beginning to create an infinite loop.
      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
        scrollContainer.scrollLeft = 0;
      }

      animationId = requestAnimationFrame(play);
    };

    animationId = requestAnimationFrame(play);

    return () => cancelAnimationFrame(animationId);
  }, [isDown, isHovering]);

  const handleMouseDown = (e) => {
    setIsDown(true);
    if (!scrollRef.current) return;
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDown(false);
    setIsHovering(false);
  };

  const handleMouseUp = () => {
    setIsDown(false);
  };

  const handleMouseMove = (e) => {
    if (!isDown || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // scroll-fast

    let newScrollLeft = scrollLeft - walk;
    const maxScroll = scrollRef.current.scrollWidth / 2;

    // Wrap around during drag for infinite feel
    if (newScrollLeft >= maxScroll) {
      newScrollLeft -= maxScroll;
      setStartX(e.pageX - scrollRef.current.offsetLeft);
      setScrollLeft(newScrollLeft);
    } else if (newScrollLeft <= 0) {
      newScrollLeft += maxScroll;
      setStartX(e.pageX - scrollRef.current.offsetLeft);
      setScrollLeft(newScrollLeft);
    }

    scrollRef.current.scrollLeft = newScrollLeft;
  };

  // Duplicate items twice to create the perfect 50% split for the loop
  const extendedItems = [...items, ...items];

  return (
    <div
      className="relative w-full overflow-hidden py-4 perspective-1000"
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      style={{ cursor: isDown ? 'grabbing' : 'grab' }}
    >
      <div
        ref={scrollRef}
        className="flex space-x-6 overflow-x-auto scrollbar-hide px-4 pb-8 items-center"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {extendedItems.map((item, idx) => (
          <div
            key={`${item.id}-${idx}`}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className="group flex-none w-[280px] md:w-[340px] h-[360px] rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 ease-out hover:scale-105 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(212,175,55,0.25)] relative"
            style={{
              transformStyle: 'preserve-3d',
            }}
          >
            {/* 3D Hover Effect Overlay */}
            <div className="absolute inset-0 z-20 transition-transform duration-500 group-hover:rotate-x-12 group-hover:-rotate-y-12"></div>

            <div className="h-full w-full overflow-hidden relative">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 pointer-events-none"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-darkbg/95 via-darkbg/50 to-transparent pointer-events-none"></div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 p-8 w-full transform transition-all duration-500 group-hover:translate-z-50 pointer-events-none">
                <h3 className="text-3xl font-bold mb-3 text-primary drop-shadow-lg">{item.name}</h3>
                <p className="text-lighttext/90 text-base leading-relaxed drop-shadow-md line-clamp-3">{item.description}</p>
                <div className="mt-4 w-12 h-1 bg-primary rounded-full transition-all duration-500 group-hover:w-full opacity-50 group-hover:opacity-100"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TasteCarousel;
