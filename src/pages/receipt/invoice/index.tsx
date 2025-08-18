import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button, Divider, Form, Input, InputNumber, InputRef, notification, Select, Space } from "antd";
import FormItem from "@/common/Form/formItem";
import SelectP from "@/common/select";
import { useTranslation } from "react-i18next";
import { useForm } from "antd/lib/form/Form";
import request from "@/store/request";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import FormList from "antd/lib/form/FormList";
import { designService } from "@/store/apis/item";
import { from } from "rxjs";
import { printService } from "@/store/apis/print";
import historyService from "@/store/history";

const calcFinalPrice = (price: number = 0, discountPercent: number = 0, discount: number = 0, qty: number = 1,) => {
    let final = (price || 0) * qty;
    if (discountPercent) {
        final = final * (1 - discountPercent / 100);
    }
    if (discount) {
        final = final - discount;
    }
    return parseFloat(final.toFixed(2));
};

export const shops = ['SL Studio Pte. Ltd.', 'Slady Fashion Pte. Ltd.']
export const saler = ['Serene', 'Sandy', 'Xiao Li', 'Yen', 'Staff']
export const paymentList = ['Bank Transfer/Pay Now', 'Cash', 'Nets', 'VISA', 'Master', 'Union', 'Slady Voucher', 'AMEX', 'Mall Voucher']
export enum areaType {
    ALL,
    SINGAPORE,
    KOREA,
    CHINA
}
export enum InvoiceType {
    PENDING = '0',
    SENT = '1',
    OK = '2',
    STOCKOUT = '3',
    DAMAGED = '4'
}
let index = 0
const Invoice: FC = () => {
    const [t] = useTranslation()
    const [form] = useForm()
    const [payment, setPayment] = useState('');
    const inputRef = useRef<InputRef>(null);

    const [newPayment, setNewPayment] = useState(paymentList);

    // refs 持久化状态（不会触发重渲染）
    const addRef = useRef<((defaultValue?: any, insertIndex?: number) => void) | null>(null);
    const bufferRef = useRef<string>('');
    const lastTimeRef = useRef<number>(Date.now());
    const items = Form.useWatch('item', form) as Array<any> | undefined;

    const totalPrice = useMemo(() => {
        // 不是数组，或者长度为0
        if (!Array.isArray(items) || items.length === 0) {
            return 0;
        }
        // 包含 undefined 元素
        if (items.some(item => item === undefined)) {
            return 0;
        }
        return (items || []).reduce((sum, cur) => {
            return sum + calcFinalPrice(cur.price, cur.discountPercent, cur.discount, cur.qty);
        }, 0)
    }, [items])

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // 屏蔽所有功能键（F1-F12, Ctrl, Alt, Shift 等）
            if (
                e.key.startsWith("F") || // F1-F12
                e.ctrlKey ||
                e.altKey ||
                e.metaKey ||
                e.key === "Shift"
            ) {
                e.preventDefault();
                e.stopPropagation();
                return;
            }
            const now = Date.now();
            if (now - lastTimeRef.current > 50) {
                bufferRef.current = '';
            }
            lastTimeRef.current = now;

            if (e.key === 'Enter') {
                e.preventDefault();
                const code = bufferRef.current;
                bufferRef.current = '';
                const target = e.target as HTMLElement | null;
                if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
                    return;
                }
                const config = designService.DesignPage({}, {
                    design: code,
                    "searchPage": {
                        "desc": 1,
                        "page": 1,
                        "pageSize": 20,
                        "sort": "id"
                    }
                })
                from(request(config)).subscribe((res: any) => {
                    if (res) {
                        const price = parseInt(res.result.content[0]['salePrice'])
                        const scannedData = { code, qty: 1, price: price, discountPercent: 0, discount: 0, };
                        if (addRef.current) {
                            addRef.current(scannedData);
                        } else {
                            const items = form.getFieldValue('item') || [];
                            form.setFieldsValue({ item: [...items, scannedData] });
                        }
                    }
                })
            } else {
                bufferRef.current += e.key;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [form]);

    const onFinish = async () => {
        const itemForm: any = form.getFieldsValue()
        const payment = itemForm.paymentList?.reduce((total: any, current: any) => total + parseFloat(current.amount), 0)
        const newItem = {
            ...itemForm,
            gst: 0,
            totalPrice,
            address: itemForm.shop === shops[0] ? 'Raffles City (#03-29B)' : 'Raffles Place (#04-24/25)',
            item: itemForm.item?.map((item: any) => ({ ...item, finalPrice: calcFinalPrice(item.price, item.discountPercent, item.discount, item.qty) }))
        }
        console.log(payment, totalPrice, 'totalPrice');

        if (payment.toFixed(2) === totalPrice.toFixed(2)) {
            const res = await request(printService.PrintReceipt({}, newItem))
            console.log(res, 'res');
            notification.success({ message: 'Printing' });

        } else {
            notification.error({ message: 'Payment Amount is not equal to Total Price' });
        }
    }

    const addPayment = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
        e.preventDefault();
        setNewPayment([...newPayment, payment || `New item ${index++}`]);
        setPayment('');
        setTimeout(() => {
            inputRef.current?.focus();
        }, 0);
    };

    const onReset = useCallback(() => {
        form.setFieldsValue({
            shop: shops[0], cashier: saler[0], item: [], paymentList: []
        })
    }, [])

    const onPackage = useCallback((value) => {
        let newPackage = {}
        if (value === -1) {
            newPackage = { code: "Alteration", qty: 1, discountPercent: 0, discount: 0, };
        } else if (value === -2) {
            newPackage = { code: "Credit", qty: 1, discountPercent: 0, discount: 0, };
        } else {
            newPackage = { code: "Package" + value, qty: 1, price: value, discountPercent: 0, discount: 0, };
        }
        if (addRef.current) {
            addRef.current(newPackage);
        } else {
            const items = form.getFieldValue('item') || [];
            form.setFieldsValue({ item: [...items, newPackage] });
        }

    }, [])


    return (
        <>
        <Button onClick={()=>historyService.goBack()} style={{marginBottom:20}}>{'<'} {t('BACK')}</Button>
            <div style={{ display: "flex", justifyContent: "space-between", width: 900, marginBottom: 20 }}>
                <Button type="primary" onClick={() => onPackage(1200)}>PACKAGE 1200</Button>
                <Button type="primary" onClick={() => onPackage(1800)}>PACKAGE 1800</Button>
                <Button type="primary" onClick={() => onPackage(2800)}>PACKAGE 2800</Button>
                <Button type="primary" onClick={() => onPackage(3800)}>PACKAGE 3800</Button>
                <Button type="primary" onClick={() => onPackage(5000)}>PACKAGE 5000</Button>
                <Button type="primary" onClick={() => onPackage(-1)}>Alteration</Button>
                <Button type="primary" onClick={() => onPackage(-2)}>Credit</Button>

            </div>

            <Form form={form} className="email-new" initialValues={{
                shop: shops[0], cashier: saler[0]
            }}>
                <FormItem name="shop" label={t('SHOP_NAME')}>
                    <SelectP data={shops} style={{ width: 200 }} />
                </FormItem>

                <FormItem name="cashier" label={t('CASHIER')}>
                    <SelectP data={saler} style={{ width: 200 }} />
                </FormItem>
                {/* Items 列表 */}
                <Form.List name="item">
                    {(fields, { add, remove }) => {
                        addRef.current = add;
                        return (
                            <>
                                <Form.Item>
                                    Item：
                                    <Button
                                        type="dashed"
                                        onClick={() => add()}
                                        icon={<PlusOutlined />}
                                    >
                                        Add
                                    </Button>
                                </Form.Item>

                                {fields.map(({ key, name, ...restField }) => {
                                    const cur = (items && items[name]) || {};
                                    const qty = Number(cur.qty ?? 0);
                                    const price = Number(cur.price ?? 0);
                                    const discountPercent = Number(cur.discountPercent ?? 0);
                                    const discount = Number(cur.discount ?? 0);
                                    const finalPrice = calcFinalPrice(price, discountPercent, discount, qty);
                                    return (
                                        <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'code']}
                                                rules={[{ required: true, message: 'Missing code' }]}
                                            >
                                                <Input placeholder="Code" />
                                            </Form.Item>
                                            <Form.Item {...restField} name={[name, 'qty']} initialValue={1}>
                                                <InputNumber placeholder="Qty" min={0} style={{ width: 60 }} />
                                            </Form.Item>
                                            <Form.Item {...restField} name={[name, 'price']}>
                                                <InputNumber placeholder="Price per unit" style={{ width: 100 }} />
                                            </Form.Item>
                                            <Form.Item {...restField} name={[name, 'discountPercent']} initialValue={0}>
                                                <InputNumber placeholder="Discount/%" min={0} max={100} style={{ width: 100 }} />
                                            </Form.Item>(%)
                                            <Form.Item {...restField} name={[name, 'discount']} initialValue={0}>
                                                <InputNumber placeholder="Discount/Number" min={0} style={{ width: 100 }} />
                                            </Form.Item>(Number)

                                            {/* 显示计算结果 */}
                                            <div style={{ minWidth: 80, marginLeft: 100, fontWeight: 600 }}>Final: {finalPrice}</div>
                                            <MinusCircleOutlined onClick={() => remove(name)} style={{ color: 'red' }} />
                                        </Space>
                                    );
                                })}
                            </>
                        );
                    }}
                </Form.List>

                {/* 🔹 总价显示 */}
                <Form.Item label="Total Price">
                    <div style={{ fontWeight: 'bold', fontSize: 16 }}>
                        {totalPrice.toFixed(2)}
                    </div>
                </Form.Item>

                {/* Payment 列表 */}
                <FormList name="paymentList">
                    {(fields, { add, remove }) => (<>
                        <Form.Item>
                            {t('PAYMENT')}：
                            <Button type="dashed" onClick={() => {
                                const { item, paymentList } = form.getFieldsValue()
                                if (item) {
                                    const price = item.reduce((prev: number, current: any) => {
                                        const { price, discount, discountPercent, qty } = current
                                        return prev + calcFinalPrice(price, discountPercent, discount, qty)
                                    }, 0)
                                    const pay = (paymentList || []).reduce((prev: number, current: any) => {
                                        const { amount } = current
                                        return prev + amount
                                    }, 0)
                                    add({ payment: '', amount: (price - pay).toFixed(2) })
                                } else {
                                    notification.error({ message: "Please add Item before payement" })
                                }
                            }} icon={<PlusOutlined />}>
                                {t('ADD_FIELD')}
                            </Button>
                        </Form.Item>
                        {fields.map(({ key, name, ...restField }) => (
                            <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                <Form.Item
                                    {...restField}
                                    name={[name, 'payment']}
                                    rules={[{ required: true, message: t('MISSING_PAYMENT') }]}
                                >
                                    <Select
                                        style={{ width: 300 }}
                                        dropdownRender={(menu) => (
                                            <>
                                                {menu}
                                                <Divider style={{ margin: '8px 0' }} />
                                                <Space style={{ padding: '0 8px 4px' }}>
                                                    <Input
                                                        placeholder={t('PLEASE_ENTER_ITEM')}
                                                        ref={inputRef}
                                                        value={payment}
                                                        onChange={(e) => setPayment(e.target.value)}
                                                    />
                                                    <Button type="text" icon={<PlusOutlined />} onClick={addPayment}>
                                                        {t('ADD_PAYMENT')}
                                                    </Button>
                                                </Space>
                                            </>
                                        )}
                                        options={newPayment.map((item) => ({ label: item, value: item }))}
                                    />
                                </Form.Item>

                                <Form.Item {...restField} name={[name, 'amount']}>
                                    <InputNumber placeholder="Amount" min={0} />
                                </Form.Item>
                                <MinusCircleOutlined onClick={() => remove(name)} style={{ color: "red" }} />
                            </Space>
                        ))}
                    </>)}
                </FormList>
            </Form>

            <div>
                <Button type="primary" style={{ marginRight: 20 }} onClick={onFinish}>{t('CONFIRM')}</Button>
                <Button onClick={onReset}>{t('RESET')}</Button>
            </div>
        </>
    );
};


export default Invoice;
