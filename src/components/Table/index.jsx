import VirtualScroll from "react-dynamic-virtual-scroll"
import './index.scss'
import PropTypes from 'prop-types'
import {useCallback} from "react";

function Table({ height = '100vh', minItemHeight = 40, items, buffer = 10, columns = [], onClickItem } = {}) {
 const rowItem = useCallback((rowIndex) => {
  return (
   <div className="tr" onClick={() => onClickItem && onClickItem(items[rowIndex])} style={{cursor: onClickItem ? 'pointer' : 'auto'}}>
    {columns.map((column, index) => <div key={index} className="td"><div className="caption">{column}</div> <div className="data">{items[rowIndex][column]}</div></div>)}
   </div>
  )
 }, [items, columns, onClickItem]);

 return (
    <>
     <div className="mytable">
      <div className="thead">
       {columns.map((column, index) => <div key={index} className="th">{column}</div>)}
      </div>
        <VirtualScroll
         className="tbody"
         style={{ height, overflowY: 'auto' }}
         minItemHeight={minItemHeight}
         totalLength={items.length}
         renderItem={rowItem}
           buffer={buffer}
        />
      </div>
    </>
  )
}


Table.propTypes = {
  height: PropTypes.string,
  minItemHeight: PropTypes.string,
  items: PropTypes.array.isRequired,
  buffer: PropTypes.number,
  columns: PropTypes.array.isRequired,
  onClickItem: PropTypes.func
};

export default Table
