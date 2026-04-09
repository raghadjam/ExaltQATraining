from selenium import webdriver

def test_title(baseUrl):
    driver = webdriver.Chrome()
    driver.get(baseUrl)
    assert driver.title == "Civil Registration System"
    getAll = driver.find_element("id", "getAll")
    getAll.click()
    driver.quit()
