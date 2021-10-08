import React, { useState } from 'react'
import QRCode from 'qrcode'
import 'antd/dist/antd.css'
import { Form, Input, Button, Row, Col, InputNumber, Select, Image } from 'antd'

const { Option } = Select

function App() {
	const [data, setData] = useState('')
	const onFinish = async (values) => {
		try {
			const response = await QRCode.toDataURL(values.text, {
				errorCorrectionLevel: values.error,
				version: values.version,
			})
			setData(response)
		} catch (err) {
			alert(err)
			console.error(err)
		}
	}

	return (
		<Row style={{ marginTop: '50px' }}>
			<Col span={8} offset={8}>
				<Form onFinish={onFinish} layout='vertical'>
					<Form.Item
						label='Chuỗi cần sinh mã QR'
						name='text'
						rules={[
							{
								required: true,
								message: 'Vui lòng nhập chuỗi cần sinh mã QR!',
							},
						]}
					>
						<Input />
					</Form.Item>

					<Form.Item
						label='Phiên bản'
						name='version'
						rules={[
							{ required: true, message: 'Vui lòng nhập phiên bản!' },
							{ type: 'number', message: 'Vui lòng nhập chữ sô!' },
						]}
						extra='Phiên bản từ 1 - 40.'
					>
						<InputNumber min={1} max={40} style={{ width: '100%' }} />
					</Form.Item>

					<Form.Item
						label='Mức độ sửa lỗi'
						name='error'
						rules={[
							{ required: true, message: 'Vui lòng chọn mức độ sửa lỗi!' },
						]}
					>
						<Select placeholder='Chọn mức độ sửa lỗi' style={{ width: '100%' }}>
							<Option value='L'>L</Option>
							<Option value='M'>M</Option>
							<Option value='Q'>Q</Option>
							<Option value='H'>H</Option>
						</Select>
					</Form.Item>

					<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
						<Button type='primary' htmlType='submit'>
							Sinh mã QR
						</Button>
					</Form.Item>
				</Form>
			</Col>
			<Col>
				<div style={{ margin: '50px' }}>
					<Image width={250} src={data} />
				</div>
			</Col>
		</Row>
	)
}

export default App
