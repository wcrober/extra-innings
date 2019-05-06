import React, {Component} from 'react';

export class ForSaleItemsList extends Component {

    render() {

        const records = this.props.records
        let recordItems = records.map((record) => {
            // If needed I can pass a unique key for each record such as <li key={record.id}> If I had a unique ID for each user.
            return(
                <div>
                    <h1>{record.seller_id}: Items For Sale</h1>
                      <li>Date: {record.timestamp}</li>
                      <li>Item: {record.for_sale_item} </li>
                      <li>Amount: {record.for_sale_amount}</li>
                </div>
            )
                          
        })

        return (
            <ul>{recordItems}</ul>
        )

    }


}