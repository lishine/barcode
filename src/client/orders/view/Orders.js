import { Flex, Box } from 'reflexbox'
import saveAs from 'file-saver'
import Table from 'rc-table'
// import Tooltip from 'rc-tooltip'
// import 'rc-tooltip/assets/bootstrap.css'
import ReactTooltip from 'react-tooltip'
import { ordersStore } from 'orders/logic/ordersStore'
import { LoadingPulse } from 'common/svg/LoadingPulse'
import { Barcode } from 'common/svg/Barcode'
import { Invoice } from 'common/svg/Invoice'
// import { StatusCircleIcon } from 'orders/view/styled/StatusCircleIcon'
import { StatusIcon } from './styled/StatusIcon'
import { StatusText } from './styled/StatusText'
import { Status } from './styled/Status'
import { StatusTab } from './styled/StatusTab'
import { CircleSvg } from './styled/CircleSvg'
import { Title } from './styled/Title'
import { Container } from './styled/Container'
import './Orders.scss'
import { downloadOrder } from 'orders/logic/actions'

const columns = [
	{
		title: 'Number',
		dataIndex: 'number',
		width: 150,
		align: 'center',
	},
	{
		title: 'Date',
		dataIndex: 'date',
		width: 100,
		align: 'center',
	},
	{
		title: 'Quantity',
		dataIndex: 'quantity',
		width: 100,
		align: 'center',
	},
	{
		title: 'Price',
		dataIndex: 'price',
		width: 130,
		align: 'center',
	},
	{
		title: 'Status',
		dataIndex: 'status',
		width: 130,
		align: 'center',
		render: (value, row, index) => {
			const { text, fill } = when(value)
				.is('canceled', { text: 'cancel.', fill: 'red' })
				.is('processed', { text: 'process.', fill: 'yellow' })
				.is('completed', { text: 'compl.', fill: 'green' })
				.else(() => {
					'error'
				})
			return (
				<Status>
					<StatusTab>
						<StatusIcon>
							<CircleSvg {...{ fill }} />
						</StatusIcon>
						<StatusText>{text}</StatusText>
					</StatusTab>
				</Status>
			)
		},
	},
	{
		title: 'Download',
		dataIndex: 'download',
		width: 130,
		align: 'center',
		render: (value = {}, row, index) => (
			<span>
				<button
					data-tip="download invoice"
					type="button"
					className="svg-btn invoice-btn"
					onClick={() => dispatch(downloadOrder('invoice', index))}>
					{value.invoiceLoading ? <LoadingPulse /> : <Invoice />}
				</button>
				<button
					data-tip="download barcode"
					type="button"
					className="svg-btn package-btn"
					onClick={() => dispatch(downloadOrder('package', index))}>
					{value.packageLoading ? <LoadingPulse /> : <Barcode />}
				</button>
				<ReactTooltip effect="solid" type="warning" />
			</span>
		),
	},
	{
		title: 'Barcodes',
		dataIndex: 'barcodes',
		width: 230,
		align: 'center',
		render: (value, row, index) => {
			const firstBarcode = get(0)(value)
			const lastBarcode = value.length <= 1 ? '' : get(value.length - 1)(value)
			return (
				<span>
					{firstBarcode && <span>{firstBarcode}</span>}
					{lastBarcode && (
						<span>
							{' '}
							... <span style={{ marginLeft: '2px' }}>{lastBarcode}</span>
						</span>
					)}
				</span>
			)
		},
	},
]

export default view(() => (
	<Container>
		<Title>Orders</Title>
		<Table rowKey="number" columns={columns} data={ordersStore.data} />
	</Container>
))
