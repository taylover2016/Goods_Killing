# Libraries include
from selenium import webdriver
from selenium.webdriver.firefox.firefox_binary import FirefoxBinary
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains

import time
import datetime

# Define path and capabilities
def BrowserCalling():
    DesiredCaps = webdriver.DesiredCapabilities().FIREFOX
    DesiredCaps['marionette'] = True
    binary = FirefoxBinary(r'/Applications/Firefox Developer Edition.app/Contents/MacOS/firefox')
    driver = webdriver.Firefox(firefox_binary = binary, capabilities= DesiredCaps)
    return driver

driver = BrowserCalling()


class GoodsKilling:

  # Personal Info
    username = ""
    password = ""

  # Related URLs
    homepage = ""
    shop_bag = ""
    item_page = ""

  # Specs
    model = ""
    color = ""
    storage = ""


    def __init__(self):
        self.username = ""	#输入Apple ID 用户名
        self.password = ""	#输入Apple ID 密码
        self.homepage = "https://www.apple.com.cn/"
        self.shop_bag = "https://www.apple.com.cn/shop/bag"
        self.item_page = "https://www.apple.com.cn/shop/buy-iphone/iphone-12-pro"
        self.model = "Item1-dimensionScreensize-6_7inch"    #iPhone 12 Pro Max
        self.color = "Item2silver_label"    #银色
        self.storage = "Item3128gb_label"   #128G

    def SpecSelection(self):
        driver.get(self.item_page)
        WebDriverWait(driver, 10, 0.1).until(EC.presence_of_element_located((By.ID, self.model)))
        driver.find_elements_by_class_name("form-choiceselectorlabel-twocol")[1].click()
        driver.find_element_by_id(self.color).click()
        driver.find_element_by_id(self.storage).click()
        driver.find_elements_by_class_name("form-selector-title")[3].click()


        # 等待按钮出现
        add_to_cart = WebDriverWait(driver, 10, 0.1).until(EC.presence_of_element_located((By.NAME, "add-to-cart")))
        add_to_cart.click()

    def CheckOut(self):
        proceed = WebDriverWait(driver, 10, 0.1).until(EC.presence_of_element_located((By.NAME, "proceed")))
        proceed.click()
        go_to_cart = WebDriverWait(driver, 10, 0.1).until(EC.presence_of_element_located((By.ID, "shoppingCart.actions.navCheckout")))
        go_to_cart.click()

    def SubmitOrder(self):
        # 用户登录
        username = WebDriverWait(driver, 10, 0.1).until(EC.presence_of_element_located((By.ID, "recon-0-0")))
        username.send_keys(self.username)
        driver.find_element_by_id("recon-0-1").send_keys(self.password)
        driver.find_element_by_id("signInButtonId").click()

        # 送货详情
        shipping = WebDriverWait(driver, 10, 0.1).until(EC.presence_of_element_located((By.ID, "addressVerification")))
        invoice = "document.getElementById(\"checkout.shipping.eFapiaoSelector.selectFapiao-1\").click()"
        driver.execute_script(invoice)
        shipping_btn = "document.getElementById(\"addressVerification\").click()"
        driver.execute_script(shipping_btn)

        # 订单选项
        order = WebDriverWait(driver, 10, 0.1).until(EC.presence_of_element_located((By.ID, "rs-checkout-continue-button-bottom")))
        goto_payment = "document.getElementById(\"rs-checkout-continue-button-bottom\").click()"
        driver.execute_script(goto_payment)

        # 选择付款方式
        alipay = WebDriverWait(driver, 10, 0.1).until(EC.presence_of_element_located((By.ID, "checkout.billing.billingOptions.options.0")))
        alipay.click()
        goto_payment = "document.getElementById(\"rs-checkout-continue-button-bottom\").click()"
        driver.execute_script(goto_payment)

        # 提交订单
        order_submit = WebDriverWait(driver, 10, 0.1).until(EC.presence_of_element_located((By.ID, "rs-checkout-continue-button-bottom")))
        goto_payment = "document.getElementById(\"rs-checkout-continue-button-bottom\").click()"
        #driver.execute_script(goto_payment)


# 新建一个对象
iPhone = GoodsKilling()

# 勾选相应参数
iPhone.SpecSelection()

# 结账
iPhone.CheckOut()

# 下单
iPhone.SubmitOrder()



