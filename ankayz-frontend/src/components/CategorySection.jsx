import React from 'react';
import { accessories, kidsWear, menWear, womenWear } from '../assets/images';


const categories = [
{name:'Women Wear', img:womenWear},
{name:'Men Wear', img:menWear},
{name:'Accessories', img:accessories},
{name:'Kids Wear', img:kidsWear},
]


export default function CategorySection(){
return (
<section className="py-16 bg-gray-50">
<div className="max-w-6xl mx-auto px-6">
<h4 className="text-3xl font-bold text-center mb-8">Explore Our Collections</h4>
<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
{categories.map(c=> (
<div key={c.name} className="group overflow-hidden rounded-xl shadow hover:shadow-2xl transition">
<img src={c.img} alt={c.name} className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700" />
<div className="p-4 text-center">
<h5 className="text-lg font-semibold">{c.name}</h5>
</div>
</div>
))}
</div>
</div>
</section>
)
}