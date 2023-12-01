import React, { useEffect, useState } from "react";
import axios from "axios";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { saveAs } from 'file-saver';
import { connect } from 'react-redux';
import { addToCollection } from "../../action";
import { Button } from "../../Component/Button/Index";
import { FaArrowDownLong } from "react-icons/fa6";
import { MdAdd } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";
import { PiTagBold } from "react-icons/pi";
import { Input } from "../../Component/Input/Index";
import { Link } from "react-router-dom";

const Home = ({ addToCollection }) => {
    const [images, setImages] = useState([]);
    const [image, setImage] = useState(null);
    const [isShown, setIsShown] = useState(false);
    const [istagShown, setIsTagShown] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const handletagClick = () => {
        setIsTagShown((current) => !current);
    };

    const handleTagDelete = (imageId, tag) => {
        setImages((prevImages) => {
            return prevImages.map((image) => {
                if (image.id === imageId) {
                    const updatedTags = image.tags.filter((t) => t !== tag);
                    return {
                        ...image,
                        tags: updatedTags,
                    };
                }
                return image;
            });
        });
    };

    const handletag1Click = (imageId, tag) => {
        setImages((prevImages) => {
            return prevImages.map((image) => {
                if (image.id === imageId) {
                    const updatedTags = image.tags.includes(tag)
                        ? image.tags.filter((t) => t !== tag)
                        : [...image.tags, tag];
                    return {
                        ...image,
                        tags: updatedTags,
                    };
                }
                return image;
            });
        });
    };

    const handleAddToCollection = (image) => {
        console.log("Adding to collection:", image);
        addToCollection(image);
    };
    const handleClick = () => {
        setIsShown((current) => !current);
    };

    const handleSizeChange = (imageId, newSize) => {
        setImages((prevImages) => {
            return prevImages.map((image) => {
                if (image.id === imageId) {
                    return {
                        ...image,
                        size: newSize,
                    };
                }
                return image;
            });
        });
    };
    const handleImage = (e) => {
        setImage(e.target.files[0]);
    };

    useEffect(() => {
        getImage();
    }, []);

    const getImage = () => {
        axios.get("https://api.thecatapi.com/v1/images/search?limit=10").then((response) => {

            const imagesWithSize = response.data.map((image) => ({
                ...image,
                size: "original",
                tags: [],
            }));
            setImages(imagesWithSize);
        });
    }
    
    const handleSearch=()=>    {
        const query = searchQuery.toLowerCase();
        const filtered = images.filter((image) =>
            image.tags.some((tag) => tag.toLowerCase().includes(query))
        );
        setImages(filtered);
};
        
    

    const downloadImage = (url) => {
        saveAs('https://api.thecatapi.com/v1/images/search?limit=10', "image.jpg");
    };

    const handleDelete = (id) => {
        const updatedImages = images.filter((image) => image.id !== id);
        setImages(updatedImages);
    };

    return (
        <>
            <div className="bg-gray-200">
                <div className="z-10 fixed  w-full  bg-black  sm:bg-opacity-50 bg-opacity-50 absolute px-5" style={{ height: "513px" }}>
                    <div className="py-10 flex justify-end items-end">
                        <Button variant="Contact" className="">
                            <div className="relative">
                                <input
                                    className="absolute inset-0 z-[0] opacity-0 w-full"
                                    type="file"
                                    name="Images"
                                    id="Images"
                                    onChange={handleImage} />
                                <label htmlFor="Images" className="text-white h-[50px]">
                                    Upload Image
                                </label>
                            </div>
                        </Button>
                    </div>
                    <div className="flex justify-center items-center pt-24">
                        <div class="mb-3">
                            <div class="relative mb-4 flex w-full flex-wrap items-stretch">
                                <Input
                                    type="search"
                                    placeholder="Type something here for search..."
                                    aria-label="Search"
                                    aria-describedby="button-addon3"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)} />
                                <Button
                                    variant="Contact"
                                    type="button"
                                    id="button-addon3"
                                    data-te-ripple-init
                                    onClick={handleSearch}>
                                    Search
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <img
                    className=" lg:w-full sm:w-full relative"
                    style={{ height: "513px" }}
                    src="Images/cat.jpg"
                    alt="banner"
                ></img>

                <div className="container mx-auto px-8 pt-8">
                    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
                        <Masonry
                            className="my-masonry-grid"
                            columnClassName="my-masonry-grid_column"
                        >
                            {image && (
                                <div className="container group px-2 py-2 ">
                                    <img src={URL.createObjectURL(image)} alt="Uploaded" className="card-img-top rounded-2xl" />

                                </div>

                            )}

                            {images.map((value, index) => {
                                return (
                                    <div key={index} className="px-3 py-3 my-masonry-grid_column">
                                        <div className={`card group ${value.size === "small" ? "small-size" : value.size === "medium" ? "medium-size" : value.size === "large" ? "large-size" : ""}`}>
                                            <div className="relative">
                                                <img
                                                    src={value.url}
                                                    className="card-img-top rounded-2xl"
                                                    alt="image"
                                                />

                                                <div>
                                                    <Link to="./image" ><Button
                                                        variant="addbtn"
                                                        title="Add to new collection"
                                                        className={`invisible absolute group-hover:visible`}
                                                        onClick={() => handleAddToCollection(value)}
                                                    >

                                                        <MdAdd size={"20"} style={{ color: "black" }} />

                                                    </Button>
                                                    </Link>
                                                </div>
                                                <div>
                                                    <Button
                                                        variant="deletebtn"
                                                        className={`invisible absolute group-hover:visible`}
                                                        title="Delete Image"
                                                        onClick={() => handleDelete(value.id)}
                                                    >
                                                        <MdDelete size={"20"} style={{ color: "black" }} />
                                                    </Button>
                                                </div>
                                                <div>
                                                    <Button
                                                        variant="downloadbtn"
                                                        className={`invisible absolute group-hover:visible`}
                                                        title="Download Image"
                                                        onClick={() => downloadImage(value.url)}
                                                    >
                                                        <FaArrowDownLong size={"20"} color="black" />
                                                    </Button>
                                                </div>
                                                <div>
                                                    <Button
                                                        variant="settingbtn"
                                                        className={`invisible absolute group-hover:visible`}
                                                        title="Settings"
                                                        onClick={handleClick}
                                                    >
                                                        <IoSettingsSharp
                                                            size={"20"}
                                                            style={{ color: "black" }}
                                                        />
                                                        {isShown && (
                                                            <div
                                                                id="results"
                                                                className=" bg-slate-100 absolute z-10 h-32 w-20 top-10 left-1"
                                                            >
                                                                <Button
                                                                    className={"pt-2"}
                                                                    variant="setting"
                                                                    title="Small"
                                                                    onClick={() => handleSizeChange(value.id, "small")}
                                                                >
                                                                    Small
                                                                </Button>
                                                                <Button
                                                                    variant="setting"
                                                                    title="Medium"
                                                                    onClick={() => handleSizeChange(value.id, "medium")}
                                                                >
                                                                    Medium
                                                                </Button>
                                                                <Button
                                                                    variant="setting"
                                                                    title="Large"
                                                                    onClick={() => handleSizeChange(value.id, "large")}
                                                                >
                                                                    Large</Button>
                                                            </div>
                                                        )}
                                                    </Button>

                                                </div>

                                                {value.tags &&
                                                    value.tags.map((tag) => (
                                                        <>

                                                            <span
                                                                key={tag}
                                                                className="  py-3 px-2 rounded"
                                                            >
                                                                {tag}
                                                            </span>

                                                            <button
                                                                type="button"
                                                                class=""
                                                                onClick={() => handleTagDelete(value.id, tag)}
                                                            >


                                                                <svg
                                                                    class="h-4 w-4"
                                                                    fill="none"
                                                                    viewBox="0 0 24 24"
                                                                    stroke="currentColor"
                                                                    aria-hidden="true"
                                                                >
                                                                    <path
                                                                        stroke-linecap="round"
                                                                        stroke-linejoin="round"
                                                                        stroke-width="2"
                                                                        d="M6 18L18 6M6 6l12 12"
                                                                    />
                                                                </svg>
                                                            </button>

                                                        </>
                                                    ))}
                                                <div>
                                                    <Button
                                                        className="invisible absolute group-hover:visible "
                                                        variant="tagbtn"
                                                        title="Add a Tag"
                                                        onClick={handletagClick}

                                                    >
                                                        <PiTagBold
                                                            size={"20"}
                                                            style={{ color: "black" }}
                                                        />
                                                        {istagShown && (
                                                            <div className="rounded bg-slate-100 absolute z-10  w-20">
                                                                <ul className="px-5 py-5 text-black">
                                                                    <li
                                                                        className=""
                                                                        onClick={() =>
                                                                            handletag1Click(value.id, "Happy")
                                                                        }
                                                                    >
                                                                        Happy
                                                                    </li>
                                                                    <li className="pt-5" onClick={() =>
                                                                        handletag1Click(value.id, "Sad")
                                                                    }>Sad</li>
                                                                    <li className="pt-5" onClick={() =>
                                                                        handletag1Click(value.id, "Sleepy")
                                                                    }>Sleepy</li>
                                                                    <li className="pt-5" onClick={() =>
                                                                        handletag1Click(value.id, "Naughty")
                                                                    }>Naughty</li>
                                                                    <li className="pt-5" onClick={() =>
                                                                        handletag1Click(value.id, "Moody")
                                                                    }>Moody</li>
                                                                    <li className="pt-5" onClick={() =>
                                                                        handletag1Click(value.id, "Cute")
                                                                    }>Cute</li>
                                                                    <li className="pt-5" onClick={() =>
                                                                        handletag1Click(value.id, "Angry")
                                                                    }>Angry</li>
                                                                </ul>
                                                            </div>
                                                        )}
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </Masonry>
                    </ResponsiveMasonry>
                </div>
            </div>

        </>

    );
};

const mapDispatchToProps = {
    addToCollection,
};

export default connect(null, mapDispatchToProps)(Home);

