Feature: | New Product |

  Background: Before each
    Given I authenticate to the system under role ROLE_MANAGER
    When I can see dashboard button on the header
    When I click on the dashboard button

  Scenario Outline: Create a new product
    When I can see the "products" and "orders" tabs
    When I click on the "products" tab
    When I click on the 'New product' button
    Then I should see the 'Create a product' form
    When I fill in the 'Image URL' field with "<imageUrl>"
    And I fill in the 'Product name' "en" field with "<productNameEn>"
    And I fill in the 'Product name' "uk" field with "<productNameUa>"
    And I fill in the 'Product description' "en" field with "<productDescriptionEn>"
    And I fill in the 'Product description' "uk" field with "<productDescriptionUa>"
    And I fill in the 'Price' field with "<price>"
    And I fill in the 'Quantity' field with "<quantity>"
    And I select 'Category' as "<category>"
    And I check the 'Visible to customers' checkbox
    When I click on the 'Create product' button
    Then I should receive a snackbar with message 'Product successfully created'

    Examples:
      | imageUrl                      | productNameEn | productNameUa    | productDescriptionEn                                  | productDescriptionUa                        | price | quantity | category |
      | http://example.com/image.jpg  | Test Product  | Тестовий продукт | This is a test product with a longer description.     | Це тестовий продукт із довшим описом.       | 10    | 100      | mobile   |
      | http://example.com/image2.jpg | Another Test  | Інший тест       | Another test product with an even longer description. | Інший тестовий продукт із ще довшим описом. | 20    | 200      | computer |
