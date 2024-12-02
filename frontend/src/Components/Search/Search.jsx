import Item from "../Item/Item";

const Search = ({ filterProducts }) => {
  console.log('searh', filterProducts);
  const items = filterProducts || [];

  return <div>
    <div className="shopCategory-products">
      { items < 1 ? <h4 style={ { display: 'flex', alignItems: 'center', justifyContent: 'center' } }>no search matches</h4> :
        items.map((item, i) => {
          return <Item key={ i } id={ item.id } name={ item.name } image={ item.image } new_price={ item.new_price } old_price={ item.old_price } />


        })
      }
    </div>

  </div>;
};

export default Search;
