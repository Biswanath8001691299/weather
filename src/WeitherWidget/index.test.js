
import { render, fireEvent, screen} from '@testing-library/react';

import WidgetHeader from './components/WidgetHeader';
import wait from 'waait';

describe('Widget test', () => {

    test('If the metric unit is present', () => {
        render(<WidgetHeader />);
        const getelement = screen.getByText('Metric unit', { exact: false });
        expect(getelement).toBeInTheDocument();
    });


    test('If the imperial unit is present', () => {
        render(<WidgetHeader />);
        const getelement = screen.getByText('Imperial unit', { exact: false });
        expect(getelement).toBeInTheDocument();
    });


    
    test('If switch is work fine', async () => {
        const { getByTestId } = render(<WidgetHeader />);
        const myComponent = getByTestId('unit-switch');
        expect(myComponent).not.toHaveAttribute('checked', '');
        
    });


    test('Initial unit is C (Matric) Temp=> °C and wind speed = meter/sec', async () => {
        const { getByTestId, getByText } = render(<WidgetHeader />);
        expect(getByTestId('unit-from-header-temparature')).toHaveTextContent('°C');
        expect(getByTestId('unit-from-header-wind-speed')).toHaveTextContent('meter/sec');

    });


    test("After Initial render City name is populated",()=>{
        const { getByTestId } = render(<WidgetHeader />);
        const myComponent = getByTestId('city-name');
        expect(myComponent).toBeInTheDocument();
    })

})
