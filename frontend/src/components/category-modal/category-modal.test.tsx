import React from 'react';
import '@testing-library/jest-dom'
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import {createCategory, deleteCategory} from '../../services/categories.service';
import CategoryModal from "./category-modal";

const categories = [
    {category_id: 1, category_name: 'Catégorie 1'},
    {category_id: 2, category_name: 'Catégorie 2'},
]

jest.mock('../../services/categories.service', () => ({
    createCategory: jest.fn((category) => {
        categories.push({category_id: categories.length, category_name: category})
        return category
    }),
    getAllCategories: jest.fn(() => categories),
    deleteCategory: jest.fn((categoryIdToDelete) => {
        const indexToDelete = categories.findIndex(
            (category) => category.category_id === categoryIdToDelete
        );
        if (indexToDelete !== -1) {
            categories.splice(indexToDelete, 1);
        }
    }),
}));

describe('CategoryModal', () => {
    it('renders correctly', () => {
        const closeMock = jest.fn();
        render(<CategoryModal close={closeMock}/>);

        expect(screen.getByText('Gérer les catégories')).toBeInTheDocument();
        expect(screen.getByTestId('input-cat')).toBeInTheDocument();
        expect(screen.getByTestId('add-cat')).toBeInTheDocument();
        expect(screen.getByTestId('close-modal')).toBeInTheDocument();
    });

    it('adds a category when "Ajouter une catégorie" button is clicked', async () => {
        const closeMock = jest.fn();
        const categoryName = 'New Category';

        render(<CategoryModal close={closeMock}/>);

        fireEvent.change(screen.getByTestId('input-cat'), {
            target: {value: categoryName},
        });

        fireEvent.click(screen.getByTestId('add-cat'));
        await waitFor(() => {
            expect(createCategory).toHaveBeenCalledWith(categoryName);
            expect(screen.getByTestId('cat-2')).toHaveTextContent(categoryName);
        });
    });

    it('deletes a category when "Supprimer" button is clicked', async () => {
        const closeMock = jest.fn();
        const categoryName = 'Category to Delete';
        const categoryId = 3;

        render(<CategoryModal close={closeMock}/>);

        fireEvent.change(screen.getByTestId('input-cat'), {
            target: {value: categoryName},
        });
        fireEvent.click(screen.getByTestId('add-cat'));

        await waitFor(() => {
            expect(screen.getByTestId('cat-3')).toHaveTextContent(categoryName);
        });

        fireEvent.click(screen.getByTestId('delete-3'));

        await waitFor(() => {
            expect(deleteCategory).toHaveBeenCalledWith(categoryId);
            expect(screen.queryByDisplayValue(categoryName)).toBeNull();
        });
    });

    it('closes the modal when "Fermer la modal" button is clicked', () => {
        const closeMock = jest.fn();
        render(<CategoryModal close={closeMock}/>);

        fireEvent.click(screen.getByTestId('close-modal'));

        expect(closeMock).toHaveBeenCalled();
    });
});
