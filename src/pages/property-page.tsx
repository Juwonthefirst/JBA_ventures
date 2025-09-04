import { useParams } from "react-router";
import { useState } from "react";
import { MapPin, BedDouble, Bath, Ruler } from "lucide-react";

const PropertyPage = () => {
    const { id } = useParams();
    const [loaded, setLoaded] = useState(false);
    const extraInfo = [
        { Icon: BedDouble, message: "2 Bed" },
        { Icon: Bath, message: "2 Bath" },
        { Icon: Ruler, message: "300 km²" }
    ];
    console.log(id);
    return (
        <div className="flex flex-col md:flex-row md:gap-4 md:items-center">
            <img
                src={"/test.jpg"}
                className="h-72 md:h-80 object-cover rounded-b-2xl mb-4 md:w-2/3"
            />
            {
                <div className="flex flex-col gap-3 p-4 pt-0">
                    <h2 className="text-2xl ">₦6,000,000</h2>
                    <div className=" flex gap-1 text-sm items-center opacity-70">
                        <MapPin size="16" className="min-h-4 min-w-4" />
                        <p>4 Adefenwa Street, Itamaga, Ikorodu, Lagos,</p>
                    </div>
                    <ul className="flex gap-3">
                        {extraInfo.map((info, index) => (
                            <li
                                key={index}
                                className="flex gap-2  text-xs items-center bg-slate-100 rounded-sm p-1 "
                            >
                                <info.Icon size="14" />
                                <p>{info.message}</p>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-4">
                        <h2 className="text-lg font-medium">Description:</h2>
                        <p className="leading-relaxed text-sm">
                            gkxgxgxgkxfkfkfk zdgxkxtdt xtoxxtdot xglgxx otxtkzkg
                            todzltxlg xgkxkt cfkmgxg kxktclg lgxktdoy cotxkgxkt
                            xotkxgg kodtoyd oxyxoy
                        </p>
                        <ul className="list-disc list-inside">
                            <li>Hello</li>
                            <li>Hio</li>
                            <li>juown</li>
                        </ul>
                    </div>
                </div>
            }
        </div>
    );
};

export default PropertyPage;
