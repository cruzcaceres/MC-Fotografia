import { API_BASE_URL } from '../config/api';

/**
 * Fetch all photos from the backend.
 * @returns {Promise<Array>} List of photo objects.
 */
export const getPhotos = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/fotos/`);
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error("Error fetching photos:", error);
        return [];
    }
};

/**
 * Fetch only featured photos for the Home page.
 * @returns {Promise<Array>} List of featured photo objects.
 */
export const getFeaturedPhotos = async () => {
    try {
        // We'll filter them here for now, or we could add a custom endpoint in Django later
        const response = await fetch(`${API_BASE_URL}/fotos/`);
        if (!response.ok) throw new Error('Network response was not ok');
        const allPhotos = await response.json();
        return allPhotos.filter(photo => photo.is_featured);
    } catch (error) {
        console.error("Error fetching featured photos:", error);
        return [];
    }
};

/**
 * Fetch all categories from the backend.
 * @returns {Promise<Array>} List of category objects.
 */
export const getCategories = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/categorias/`);
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error("Error fetching categories:", error);
        return [];
    }
};

/**
 * Fetch all projects (galleries) from the backend, including nested photos.
 * @returns {Promise<Array>} List of project objects.
 */
export const getProjects = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/proyectos/`);
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error("Error fetching projects:", error);
        return [];
    }
};

/**
 * Fetch all published blog posts from the backend.
 * @returns {Promise<Array>} List of blog post objects.
 */
export const getBlogPosts = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/blog/`);
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error("Error fetching blog posts:", error);
        return [];
    }
};
