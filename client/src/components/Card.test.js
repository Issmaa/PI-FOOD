import React from "react";
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { prettyDOM } from "@testing-library/react";
import { Link } from 'react-router-dom'
import { Route,BrowserRouter as Router } from "react-router-dom";
import Card from "./Card.js";

test('render content', () => { 
    const card = {
        id: 9,
        image: 'notFound.png',
        name: 'Alitas de pollo', 
        diets: ['low FOODMAP', 'vegetarian', 'gluten free']
    }

    const component = render(<Router><Route><Link to={`/detail/${card.id}`}><Card id={card.id} image={card.image} name={card.name} diets={card.diets}/></Link></Route></Router>)

    // component.getByText('Alitas de pollo')
    // expect(component.container).toHaveTextContent(card.name)
    // component.debug()
    const hTres = component.container.querySelector('h3')
    console.log(prettyDOM(hTres))
})