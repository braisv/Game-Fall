import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FilterProducts from '../Filter/FilterProducts';
import AuthService from "../auth/AuthService";


export default class Listproducts extends Component {
    constructor(props) {
        super(props);

        this.state = {
            products: [],
            category: "All"
        };
        this.service = new AuthService();
    }

    getAllProducts = () => {
        this.service.getProducts()
            .then(getAllProducts => {
                this.setState({
                    products: this.filterProducts(getAllProducts.data)
                })
            })
            .catch(error => {
                console.log(error);
            });
    };

    filterCategoryDidUpdate = (c) => {
        this.setState({ ...this.state, category: c })
        this.getAllProducts()
    };

    componentDidMount() {
        this.getAllProducts();
    }

    componentWillReceiveProps() {
        this.getAllProducts();
    }

    filterProducts = (products) => {
        let query = this.props.getFilterQuery().toLowerCase();
        let category = this.state.category

        console.log("Filtering get all products by query", query, "category", category)

        let filteredProducts = products
            .filter(product => {
                if (query.length === 0) {
                    return true;
                } else {
                    let name = product.name.toLowerCase();
                    return name.includes(query);
                }
            })
            .filter(product => {
                if (category === "All" || category === "") {
                    return true
                } else {
                    return product.category === category;
                }
            });

        return filteredProducts
    };
    

    getImageName = (product) => {
        return product.imageUrl;
    };

    render() {
        return (
            <div className="container1">
                <FilterProducts {...this.state.product} filterProducts={c => this.filterCategoryDidUpdate(c)} />
                    <div className="items" >
                        {
                            this.state.products.map(product => {
                                let rating = Math.round(product.rating);
                                let hasRating = rating > 0;
                                return (
                                    <Link to={"/product/" + product._id} key={product._id}>
                                        <div className="card" style={{ width: "18rem", marginBottom: "2rem" }}>
                                            <img src={this.getImageName(product)} className="card-img-top" alt={product.name} style={{ height: "18rem" }} />
                                            <div className="card-body">
                                                <rater visible={hasRating} total={rating} rating={rating} interactive={false}/>
                                                <h3>{product.name}</h3>
                                                <h3>{product.price} €</h3>
                                                <p>{product.category}</p>
                                                <p>Owner: {product.owner.username}</p>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            })
                        }
                    </div>
                
            </div>
        )
    }

}