"use client";
import { useState } from "react";

import Image from "next/image";

function Collage() {
    const [image, setImage] = useState("/images.jpg");
    return <Image src={image} alt="image" height="400" width="400" />;
}
export default Collage;
