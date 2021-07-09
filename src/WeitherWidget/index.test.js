
import { render, fireEvent, screen, cleanup } from '@testing-library/react';
import MyWidget from './index';
import userevent from '@testing-library/user-event';
import wait from 'waait';

describe('Widget test', () => {

    test('If the Metric unit is present', () => {
        render(<MyWidget />);
        const getelement = screen.getByText('Metric unit', { exact: false });
        expect(getelement).toBeInTheDocument();
    });


    test('If the Imperial unit is present', () => {
        render(<MyWidget />);
        const getelement = screen.getByText('Imperial unit', { exact: false });
        expect(getelement).toBeInTheDocument();
    });


    test('If the Imperial unit is present', () => {
        render(<MyWidget />);
        const getelement = screen.getByText('Imperial unit', { exact: false });
        expect(getelement).toBeInTheDocument();
    });



    test('If switch is work fine', async () => {
        const { getByTestId } = render(<MyWidget />);
        const myComponent = getByTestId('unit-switch');
        expect(myComponent).not.toHaveAttribute('checked', '');
        
    });


    test('Initial unit is C (Matric) Temp=> C and wind speed = meter/sec', async () => {
        const { getByTestId, getByText } = render(<MyWidget />);
        expect(getByTestId('unit-from-header-temparature')).toHaveTextContent('°C');
        expect(getByTestId('unit-from-header-wind-speed')).toHaveTextContent('meter/sec');

    });


    test('After clicking on checkbox Updated to (Imperial) Temp=> F and wind speed = meter/sec', async () => {
        const { getByTestId, getByText } = render(<MyWidget />);

        const myComponent = getByTestId('unit-switch');
        fireEvent.click(myComponent);
        fireEvent.change(myComponent, { target: { checked: true } });
          await wait(2000);
        expect(getByTestId('unit-from-header-temparature')).toHaveTextContent('°F');
       
        expect(getByTestId('unit-from-header-wind-speed')).toHaveTextContent('miles/hour')
       
    });



})
