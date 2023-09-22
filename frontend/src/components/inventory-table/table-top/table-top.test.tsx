import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TableTop from "./table-top";

describe('TableTop Component', () => {
    it('devrait afficher le composant TableTop correctement', async () => {
        const mockStore = {
            categories: [
                { category_id: 1, category_name: 'Catégorie 1' },
                { category_id: 2, category_name: 'Catégorie 2' },
            ],
            setSelectedCategoryId: jest.fn(),
            fillProducts: jest.fn(),
        };

        jest.mock('../../../stores/products.store', () => ({
            __esModule: true,
            default: () => mockStore,
        }));

        const { getByText, getByTestId, getAllByTestId, getByRole } = render(<TableTop />);

        expect(getByText('Produits')).toBeInTheDocument();

        expect(getByTestId('edit-cat')).toBeInTheDocument();

        fireEvent.click(getByTestId('edit-cat'));

        expect(getByText('Catégorie')).toBeInTheDocument();
    });
});
