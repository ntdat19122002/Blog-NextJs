import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(),'posts');

function getPostData(fileName){
    const filePath = path.join(postsDirectory, fileName);
    const fileContent = fs.readFileSync(filePath,'utf-8');
    const {data,content} = matter(fileContent)

    const postSlug = fileName.replace(/\.md$/, '');

    const postsData = {
        slug: postSlug,
        ...data,
        content,
    }

    return postsData
}

function getAllPosts(){
    const postFiles = fs.readdirSync(postsDirectory)

    const allPosts = postFiles.map(postFiles => {
        return getPostData(postFiles);
    })

    const sortedPost = allPosts.sort((postA, postB) => postA.date > postB.date ? -1 : 1)
    
    return sortedPost;
}

export function getFeaturedPosts(){
    const allPosts = getAllPosts()

    const featuredPosts = allPosts.filter(post=>post.isFeature())

    return featuredPosts
}