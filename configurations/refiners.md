# LTAPPS Calendar PCF Control - Refiners Configuration Guide

This guide provides detailed instructions on configuring refiners (filters) for the LTAPPS Calendar PCF Control. Refiners allow users to filter calendar events based on specific criteria, enhancing the calendar's usability and making it easier to find relevant events.

## Overview

Refiners can be configured in two ways:
1. **Static Values** - Hardcoded filter options defined directly in the configuration
2. **Dynamic Values** - Filter options loaded from a Dataverse entity

The refiners configuration determines which filtering options appear in the refiner panel and how they behave.

## Configuration Structure

The refiners configuration is a JSON object with the following structure:

```json
{
    "isStaticValue": boolean,
    "staticValue": array,
    "dynamic": object
}
```

---

## Configuration Properties

### `isStaticValue`

**Type:** `boolean`  
**Required:** Yes  
**Default:** `false`

Determines whether the refiner options are static (hardcoded) or dynamic (loaded from a data source).

- `true` - Uses the values defined in `staticValue` property
- `false` - Uses the values from the Dataverse entity specified in `dynamic` property

**Example:**
```json
"isStaticValue": false
```

---

### `staticValue`

**Type:** `array of objects`  
**Required:** Only when `isStaticValue` is `true`  
**Default:** `[]`

An array of refiner options with predefined values. Each object in the array represents a single refiner option.

#### Static Value Object Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | `number` or `string` | Yes | Unique identifier for the refiner option |
| `title` | `string` | Yes | Display name shown in the refiner panel |
| `order` | `number` | Yes | Sort order for displaying refiners (lower numbers appear first) |

**Example:**
```json
"staticValue": [
    {
        "id": 1,
        "title": "Meeting Room",
        "order": 1
    },
    {
        "id": 2,
        "title": "Car",
        "order": 2
    },
    {
        "id": 3,
        "title": "Equipment",
        "order": 3
    }
]
```

---

### `dynamic`

**Type:** `object`  
**Required:** Only when `isStaticValue` is `false`  
**Default:** `null`

Configuration for loading refiner options from a Dataverse entity.

#### Dynamic Object Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `entityName` | `string` | Yes | Logical name of the Dataverse entity |
| `fields` | `object` | Yes | Field mapping configuration |

#### Fields Object Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | `string` | Yes | Logical name of the ID field in the entity |
| `title` | `string` | Yes | Logical name of the title/display field |
| `order` | `string` | Yes | Logical name of the order/sort field |

**Example:**
```json
"dynamic": {
    "entityName": "ltcal_refiner",
    "fields": {
        "id": "ltcal_refinerid",
        "title": "ltcal_title",
        "order": "ltcal_order"
    }
}
```

---

## Complete Configuration Examples

### Example 1: Static Refiners Configuration

Use this when you have a fixed set of filter options that won't change frequently.

```json
{
    "isStaticValue": true,
    "staticValue": [
        {
            "id": 1,
            "title": "Meeting Room",
            "order": 1
        },
        {
            "id": 2,
            "title": "Car",
            "order": 2
        },
        {
            "id": 3,
            "title": "Equipment",
            "order": 3
        },
        {
            "id": 4,
            "title": "Conference Room",
            "order": 4
        }
    ],
    "dynamic": null
}
```

### Example 2: Dynamic Refiners Configuration

Use this when filter options need to be managed dynamically through a Dataverse entity.

```json
{
    "isStaticValue": false,
    "staticValue": [],
    "dynamic": {
        "entityName": "ltcal_refiner",
        "fields": {
            "id": "ltcal_refinerid",
            "title": "ltcal_title",
            "order": "ltcal_order"
        }
    }
}
```

---

## Configuration Scenarios

### Scenario 1: Resource Booking Calendar

For a calendar that tracks different resource types:

```json
{
    "isStaticValue": true,
    "staticValue": [
        {
            "id": "room_a",
            "title": "Conference Room A",
            "order": 1
        },
        {
            "id": "room_b",
            "title": "Conference Room B",
            "order": 2
        },
        {
            "id": "vehicle_1",
            "title": "Company Vehicle #1",
            "order": 3
        },
        {
            "id": "vehicle_2",
            "title": "Company Vehicle #2",
            "order": 4
        },
        {
            "id": "projector",
            "title": "Projector Equipment",
            "order": 5
        }
    ],
    "dynamic": null
}
```

### Scenario 2: Project Categories

For filtering events by project categories loaded from Dataverse:

```json
{
    "isStaticValue": false,
    "staticValue": [],
    "dynamic": {
        "entityName": "cr5b3_projectcategory",
        "fields": {
            "id": "cr5b3_projectcategoryid",
            "title": "cr5b3_name",
            "order": "cr5b3_displayorder"
        }
    }
}
```

### Scenario 3: Department Filter

For filtering events by department:

```json
{
    "isStaticValue": true,
    "staticValue": [
        {
            "id": "dept_sales",
            "title": "Sales",
            "order": 1
        },
        {
            "id": "dept_marketing",
            "title": "Marketing",
            "order": 2
        },
        {
            "id": "dept_hr",
            "title": "Human Resources",
            "order": 3
        },
        {
            "id": "dept_it",
            "title": "IT",
            "order": 4
        },
        {
            "id": "dept_finance",
            "title": "Finance",
            "order": 5
        }
    ],
    "dynamic": null
}
```

### Scenario 4: Event Priority

For filtering by event priority levels:

```json
{
    "isStaticValue": true,
    "staticValue": [
        {
            "id": 1,
            "title": "High Priority",
            "order": 1
        },
        {
            "id": 2,
            "title": "Medium Priority",
            "order": 2
        },
        {
            "id": 3,
            "title": "Low Priority",
            "order": 3
        }
    ],
    "dynamic": null
}
```

---

## Implementation Steps

### Option A: Static Refiners Setup

#### Step 1: Define Your Refiner Options

1. Identify the filter categories you need for your calendar
2. Assign unique IDs to each option
3. Create descriptive titles for user display
4. Determine the display order

#### Step 2: Create the Configuration

1. Create a new JSON file or use the provided example
2. Set `isStaticValue` to `true`
3. Add your refiner options to the `staticValue` array
4. Set `dynamic` to `null` or an empty object
5. Validate the JSON syntax

#### Step 3: Apply to Calendar Control

**For Model-Driven Apps:**
1. Navigate to your Model-Driven App
2. Open the form with the calendar control
3. Select the calendar control
4. Find the "Refiners" configuration property
5. Paste your JSON configuration
6. Save and publish

**For Canvas Apps:**
1. Open your Canvas App
2. Select the calendar control
3. Find the "Refiners" property
4. Paste your JSON configuration
5. Save and publish

**For Custom Pages:**
1. Open your Custom Page
2. Select the calendar control
3. Find the "Refiners" property
4. Paste your JSON configuration
5. Save and publish

---

### Option B: Dynamic Refiners Setup

#### Step 1: Create the Dataverse Entity

1. Navigate to [Power Apps](https://make.powerapps.com)
2. Go to **Tables** (formerly Entities)
3. Click **+ New table** → **Add columns and data**
4. Name your table (e.g., "Calendar Refiner")
5. Add the following columns:
   - **Title** (Single line of text) - Display name for the refiner
   - **Order** (Whole number) - Sort order for display

#### Step 2: Populate the Entity

1. Open your newly created table
2. Add refiner records with appropriate titles and order values
3. Save your records

Example data:

| Title | Order |
|-------|-------|
| Meeting Room | 1 |
| Car | 2 |
| Equipment | 3 |
| Conference Room | 4 |

#### Step 3: Get Entity and Field Names

1. In Power Apps, open your table
2. Click **Settings** → **Advanced settings**
3. Note the **Logical name** (e.g., `ltcal_refiner`)
4. For each field, note the **Logical name**:
   - ID field: Usually `[prefix]_[tablename]id`
   - Title field: e.g., `ltcal_title`
   - Order field: e.g., `ltcal_order`

#### Step 4: Create the Configuration

```json
{
    "isStaticValue": false,
    "staticValue": [],
    "dynamic": {
        "entityName": "YOUR_ENTITY_LOGICAL_NAME",
        "fields": {
            "id": "YOUR_ID_FIELD_LOGICAL_NAME",
            "title": "YOUR_TITLE_FIELD_LOGICAL_NAME",
            "order": "YOUR_ORDER_FIELD_LOGICAL_NAME"
        }
    }
}
```

Replace the placeholders with your actual field names.

#### Step 5: Apply to Calendar Control

Follow the same steps as in Option A, Step 3.

---

## Linking Refiners to Calendar Events

After configuring refiners, you need to ensure your calendar events reference the refiner values:

### For Static Refiners

Your event entity should have a field that stores the refiner ID (e.g., a choice field or a text field containing the ID).

### For Dynamic Refiners

Your event entity should have a lookup field that references the refiner entity.

**Example:**
1. Add a lookup field to your event entity
2. Name it "Resource Type" or similar
3. Point it to your refiner entity
4. When creating events, select the appropriate refiner value

---

## Validation and Testing

After configuring refiners:

1. **Verify Refiner Display**: Open the calendar and check that refiners appear in the refiner panel
2. **Test Sorting**: Confirm refiners are displayed in the correct order
3. **Test Filtering**: Select refiner options and verify events are filtered correctly
4. **Test Multi-Level**: If enabled, test selecting multiple refiners simultaneously
5. **Test Expand/Collapse**: Verify the refiner panel expands and collapses as configured

---

## Troubleshooting

### Refiners Not Appearing

**Issue:** Refiner panel is empty or not showing

**Solutions:**
- Verify `useRefiners` is set to `true` in the main configuration
- Check JSON syntax is valid
- Ensure `isStaticValue` matches your chosen configuration type
- For dynamic refiners, verify the entity has data

### Dynamic Refiners Not Loading

**Issue:** Dynamic refiners don't appear or show errors

**Solutions:**
- Verify entity logical name is correct
- Confirm all field logical names are accurate
- Check that the Dataverse entity has active records
- Ensure the app has permissions to read the refiner entity
- Verify field types are correct (text for title, number for order)

### Refiners in Wrong Order

**Issue:** Refiners don't appear in the expected sequence

**Solutions:**
- Check the `order` values in your configuration
- Ensure order values are numeric and sequential
- For static refiners, verify the order property in each object
- For dynamic refiners, check the order field values in the entity

### Filter Not Working

**Issue:** Selecting refiners doesn't filter events

**Solutions:**
- Verify event records have the refiner field populated
- For dynamic refiners, ensure lookup relationship is established
- Check that refiner IDs match the values in event records
- Verify field mappings in the calendar event configuration

---

## Best Practices

### General

1. **Use Descriptive Titles**: Make refiner titles clear and user-friendly
2. **Logical Ordering**: Order refiners in a way that makes sense to users
3. **Consistent IDs**: Use a consistent ID naming convention
4. **Test Thoroughly**: Test with various combinations of refiners selected

### Static vs Dynamic

**Use Static Refiners When:**
- You have a small, fixed set of options (< 20 items)
- Filter options rarely change
- You want simpler configuration and faster loading
- No database management is needed

**Use Dynamic Refiners When:**
- You have many refiner options
- Options need to be added/updated frequently
- You want users to manage refiners themselves
- You need centralized refiner management across multiple calendars

### Performance

1. **Limit Refiner Count**: Keep refiners to a reasonable number (< 50) for better performance
2. **Optimize Entity Queries**: For dynamic refiners, ensure proper indexing on the entity
3. **Regular Cleanup**: Remove unused or obsolete refiner options
4. **Cache Consideration**: Dynamic refiners may have slight loading delays

### Maintenance

1. **Document Your Configuration**: Keep a record of refiner meanings and purposes
2. **Version Control**: Store configuration files in version control
3. **Backup**: Keep backup copies before making changes
4. **Naming Convention**: Use clear, consistent naming for IDs and titles
5. **Regular Review**: Periodically review and update refiner options

---

## Advanced Configuration

### Multiple Refiner Categories

For complex scenarios with multiple refiner categories, you may need to configure multiple refiner controls or use a hierarchical structure in your entity.

### Conditional Refiners

To show different refiners based on app type or user role, create separate configurations and apply them conditionally through Power Apps logic.

### Custom Styling

Refiner appearance can be influenced by the main calendar configuration and theme settings in your app.

---

## Migration Guide

### Moving from Static to Dynamic

1. Create a Dataverse entity for your refiners
2. Import your static values into the entity
3. Update the configuration to use dynamic mode
4. Test thoroughly before deploying
5. Keep the static configuration as backup

### Moving from Dynamic to Static

1. Export data from your Dataverse entity
2. Convert the data to the static format
3. Update the configuration to use static mode
4. Test thoroughly before deploying
5. Consider keeping the entity for potential future use

---

## Support and Resources

### Getting Help

For additional assistance with refiner configuration:

- **Email:** support@ltaddins.com
- **Website:** [https://ltaddins.com](https://ltaddins.com)

### Related Documentation

- [Main Configuration Guide](./configuration.md)
- [Calendar Events Configuration](./events.md)
- [Dataverse Entity Setup Guide](./dataverse-setup.md)

---

**Last Updated:** November 26, 2025  
**Version:** 1.0
