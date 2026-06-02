export const addIdea = async (formData) => {
    try {
        const response = await fetch('http://localhost:3000/addIdea', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error adding idea:', error);
        throw error;
    }
};