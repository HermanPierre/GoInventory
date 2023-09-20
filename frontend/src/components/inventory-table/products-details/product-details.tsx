import React from 'react';
import SemiBoldTitle from "../../../shared/SemiboldTitle";

const ProductDetails = () => {
    return (
        <div className={'flex flex-col gap-1'}>
            <div className={'flex justify-between items-center'}>
                <div className={'flex gap-1'}>
                    <SemiBoldTitle title="Quantité:"/>
                    <span>3</span>
                </div>
                <button className="bg-red-500 text-white font-semibold px-2 py-0.5 rounded self-end hover:bg-red-600">
                    Supprimer
                </button>
            </div>
            <div className={'flex flex-col'}>
                <SemiBoldTitle title="Description:"/>
                <span className={'text-sm'}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras congue enim vel quam tincidunt gravida. Suspendisse aliquam sodales ipsum in malesuada. Phasellus maximus dui ac lectus semper, ut rutrum metus tristique. Vivamus elementum tellus eros. Curabitur eget vehicula quam. Integer in eros eget felis facilisis accumsan. Morbi pellentesque bibendum tempor. Nullam commodo sapien ut turpis ultrices laoreet. Nunc congue tortor in diam malesuada feugiat.
                </span>
            </div>
            <div className={'flex gap-1'}><SemiBoldTitle title="ID:"/>
                <span>3</span>
            </div>
        </div>
    );
};

export default ProductDetails;
