import React from "react";
import { useParams } from "react-router-dom";
import blogPosts from "../../assets/blogPosts.json";
import { Helmet } from "react-helmet";

const BlogPost = () => {
    const { id } = useParams(); // por ejemplo: 'descubre-cancun'
    const post = blogPosts.find((p) => p.id === id);

    if (!post) return <div>Artículo no encontrado</div>;

    return (
        <div className="max-w-4xl mx-auto pt-28 pb-12">
            <Helmet>
                <title>{`${post.titlemeta} | Travel Friends`}</title>
                <meta name="description" content={`Cotiza tu viaje con Travel Friends. ${post.titlemeta}` }/>
            </Helmet>
            <h1 className="text-3xl font-bold mb-4">{post.title}</h1>

            {/* Imagen del destino */}
            <img
                src={`/destinos/${post.id}.jpg`}
                alt={post.title}
                className="w-full h-auto rounded-xl shadow mb-6"
            />

            <p className="text-lg mb-4">{post.summary}</p>

            {post.sections.map((section, index) => (
                <div key={index} className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">{section.heading}</h2>
                    {section.content.map((paragraph, i) => (
                        <p key={i} className="text-base mb-2">{paragraph}</p>
                    ))}
                </div>
            ))}

            <a
                href={post.ctaUrl}
                className="inline-block mt-6 bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
            >
                {post.ctaText}
            </a>
        </div>
    );
};

export default BlogPost;
