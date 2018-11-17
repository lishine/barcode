import { Flex, Box } from 'reflexbox'
import saveAs from 'file-saver'
import Table from 'rc-table'
// import Tooltip from 'rc-tooltip'
// import 'rc-tooltip/assets/bootstrap.css'
import ReactTooltip from 'react-tooltip'
import { ordersStore } from 'orders/ordersStore'
import Checkmark from 'common/svg/Checkmark'
import Cross from 'common/svg/Cross'
import './Orders.scss'

const columns = [
	{
		title: 'Number',
		dataIndex: 'number',
		width: 100,
	},
	{
		title: 'Date',
		dataIndex: 'date',
		width: 100,
	},
	{
		title: 'Quantity',
		dataIndex: 'quantity',
		width: 200,
	},
	{
		title: 'Price',
		dataIndex: 'price',
		width: 200,
	},
	{
		title: 'Status',
		dataIndex: 'status',
		width: 200,
	},
	{
		title: 'Download',
		dataIndex: 'download',
		width: 200,
		render: (value, row, index) => (
			<span>
				<button
					type="button"
					className="svg-btn invoice-btn"
					onClick={() => ordersStore.onInvoiceDownload(index)}>
					<Cross />
				</button>
				<button
					type="button"
					className="svg-btn package-btn"
					onClick={() => ordersStore.onPackageDownload(index)}>
					<Checkmark />
				</button>
			</span>
		),
	},
	{
		title: 'Barcodes',
		dataIndex: 'barcodes',
		width: 200,
	},
]

function onClick() {
	console.log('saving')
	// var blob = new Blob(['Hello, world!', 'aaa'], { type: 'text/plain;charset=utf-8' })
	// saveAs(blob, 'hello world.txt')
}
export default view(() => {
	return (
		<>
			<button data-tip data-for="downloadOrder" type="button" onClick={onClick}>
				save
			</button>
			<ReactTooltip id="downloadOrder" type="warning">
				<span>Download order</span>
			</ReactTooltip>
			<Table rowKey="number" columns={columns} data={ordersStore.data} />
		</>
	)
})

// <Tooltip
// destroyTooltipOnHide={false}
// placement="top"
// trigger={['click']}
// align={{
// 	offset: [0, 0],
// }}
// overlayStyle={{ minHeight: 20 }}
// overlay={<span style={{ height: 20, width: 80 }}>i am a tooltip</span>}>
// </Tooltip>
