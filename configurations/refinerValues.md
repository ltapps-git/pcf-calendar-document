# LTAPPS Calendar PCF Control - Refiner Values Configuration Guide

This guide provides detailed instructions on configuring refiner values for the LTAPPS Calendar PCF Control. Refiner values represent the specific options that users can select within each refiner category, allowing for granular filtering of calendar events with custom colors and styling.

## Overview

Refiner values are the individual filter options that appear under each refiner category. For example, if you have a "Meeting Room" refiner, the refiner values might be "Meeting Room 1", "Meeting Room 2", and "Meeting Room 3". Each value can have its own color scheme to visually distinguish events in the calendar.

**Key Features:**
- Associate values with specific refiner categories
- Custom background and text colors for visual differentiation
- Support for both static (hardcoded) and dynamic (Dataverse) configurations
- Flexible ordering of values within each refiner

---

## Configuration Structure

The refiner values configuration is a JSON object with the following structure:

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

Determines whether refiner values are static (hardcoded) or dynamic (loaded from a Dataverse entity).

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

An array of refiner value options with predefined properties. Each object represents a single selectable option within a refiner category.

#### Static Value Object Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | `number` or `string` | Yes | Unique identifier for the refiner value |
| `title` | `string` | Yes | Display name shown in the calendar and refiner panel |
| `bgColor` | `string` | No | Background color for events (hex code with # or empty string) |
| `textColor` | `string` | No | Text color for events (hex code, color name, or empty string) |
| `refiner` | `number` or `string` | Yes | ID of the parent refiner category this value belongs to |
| `order` | `number` | Yes | Sort order for displaying values (lower numbers appear first) |

**Example:**
```json
"staticValue": [
    {
        "id": 1,
        "title": "Meeting Room 1",
        "bgColor": "#f70f0f",
        "textColor": "white",
        "refiner": 1,
        "order": 1
    },
    {
        "id": 2,
        "title": "Meeting Room 2",
        "bgColor": "#0ced35",
        "textColor": "white",
        "refiner": 1,
        "order": 2
    }
]
```

---

### `dynamic`

**Type:** `object`  
**Required:** Only when `isStaticValue` is `false`  
**Default:** `null`

Configuration for loading refiner values from a Dataverse entity.

#### Dynamic Object Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `entityName` | `string` | Yes | Logical name of the Dataverse entity containing refiner values |
| `fields` | `object` | Yes | Field mapping configuration |

#### Fields Object Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | `string` | Yes | Logical name of the ID field in the entity |
| `title` | `string` | Yes | Logical name of the title/display field |
| `bgColor` | `string` | Yes | Logical name of the background color field |
| `textColor` | `string` | Yes | Logical name of the text color field |
| `refiner` | `string` | Yes | Logical name of the lookup field to parent refiner |
| `order` | `string` | Yes | Logical name of the order/sort field |

**Example:**
```json
"dynamic": {
    "entityName": "ltcal_refinervalues",
    "fields": {
        "id": "ltcal_refinervaluesid",
        "title": "ltcal_title",
        "bgColor": "ltcal_bgcolor",
        "textColor": "ltcal_textcolor",
        "refiner": "ltcal_refiner",
        "order": "ltcal_order"
    }
}
```

---

## Color Configuration Guide

### Background Color (`bgColor`)

**Supported Formats:**
- **Hex Code:** `"#f70f0f"` (6-digit hex)
- **Hex with Alpha:** `"#500de2ff"` (8-digit hex with transparency)
- **Empty String:** `""` (uses default calendar color)

**Examples:**
```json
"bgColor": "#ff5733"      // Orange-red
"bgColor": "#0ced35"      // Green
"bgColor": "#500de2ff"    // Purple with full opacity
"bgColor": ""             // Default color
```

### Text Color (`textColor`)

**Supported Formats:**
- **Color Names:** `"white"`, `"black"`, `"red"`, etc.
- **Hex Code:** `"#ffffff"`, `"#000000"`, etc.
- **Empty String:** `""` (uses default text color)

**Examples:**
```json
"textColor": "white"      // White text
"textColor": "black"      // Black text
"textColor": "#ffffff"    // White text (hex)
"textColor": ""           // Default text color
```

### Color Best Practices

1. **Contrast:** Ensure sufficient contrast between background and text colors for readability
2. **Consistency:** Use a consistent color scheme across similar refiner values
3. **Accessibility:** Consider color-blind users; don't rely solely on color to convey information
4. **Brand Colors:** Use your organization's brand colors where appropriate

**Recommended Combinations:**
```json
// High contrast combinations
{ "bgColor": "#2c3e50", "textColor": "white" }  // Dark blue + white
{ "bgColor": "#e74c3c", "textColor": "white" }  // Red + white
{ "bgColor": "#27ae60", "textColor": "white" }  // Green + white
{ "bgColor": "#f39c12", "textColor": "black" }  // Orange + black
{ "bgColor": "#ecf0f1", "textColor": "black" }  // Light gray + black
```

---

## Complete Configuration Examples

### Example 1: Static Refiner Values - Meeting Rooms and Vehicles

```json
{
    "isStaticValue": true,
    "staticValue": [
        {
            "id": 1,
            "title": "Meeting Room 1",
            "bgColor": "#f70f0f",
            "textColor": "white",
            "refiner": 1,
            "order": 1
        },
        {
            "id": 2,
            "title": "Meeting Room 2",
            "bgColor": "#0ced35",
            "textColor": "white",
            "refiner": 1,
            "order": 2
        },
        {
            "id": 3,
            "title": "Meeting Room 3",
            "bgColor": "#500de2ff",
            "textColor": "white",
            "refiner": 1,
            "order": 3
        },
        {
            "id": 4,
            "title": "Car 1",
            "bgColor": "#0ced35",
            "textColor": "white",
            "refiner": 2,
            "order": 4
        },
        {
            "id": 5,
            "title": "Car 2",
            "bgColor": "",
            "textColor": "white",
            "refiner": 2,
            "order": 5
        },
        {
            "id": 6,
            "title": "Car 3",
            "bgColor": "#0c31ed",
            "textColor": "white",
            "refiner": 2,
            "order": 6
        }
    ],
    "dynamic": null
}
```

### Example 2: Dynamic Refiner Values

```json
{
    "isStaticValue": false,
    "staticValue": [],
    "dynamic": {
        "entityName": "ltcal_refinervalues",
        "fields": {
            "id": "ltcal_refinervaluesid",
            "title": "ltcal_title",
            "bgColor": "ltcal_bgcolor",
            "textColor": "ltcal_textcolor",
            "refiner": "ltcal_refiner",
            "order": "ltcal_order"
        }
    }
}
```

---

## Configuration Scenarios

### Scenario 1: Conference Room Booking

Color-coded conference rooms by capacity:

```json
{
    "isStaticValue": true,
    "staticValue": [
        {
            "id": "room_small_1",
            "title": "Small Room (4-6 people)",
            "bgColor": "#3498db",
            "textColor": "white",
            "refiner": "room_type",
            "order": 1
        },
        {
            "id": "room_medium_1",
            "title": "Medium Room (8-12 people)",
            "bgColor": "#2ecc71",
            "textColor": "white",
            "refiner": "room_type",
            "order": 2
        },
        {
            "id": "room_large_1",
            "title": "Large Room (15-20 people)",
            "bgColor": "#e67e22",
            "textColor": "white",
            "refiner": "room_type",
            "order": 3
        },
        {
            "id": "room_auditorium",
            "title": "Auditorium (50+ people)",
            "bgColor": "#c0392b",
            "textColor": "white",
            "refiner": "room_type",
            "order": 4
        }
    ],
    "dynamic": null
}
```

### Scenario 2: Equipment and Vehicle Fleet

```json
{
    "isStaticValue": true,
    "staticValue": [
        {
            "id": "proj_1",
            "title": "Projector #1",
            "bgColor": "#9b59b6",
            "textColor": "white",
            "refiner": "equipment",
            "order": 1
        },
        {
            "id": "proj_2",
            "title": "Projector #2",
            "bgColor": "#8e44ad",
            "textColor": "white",
            "refiner": "equipment",
            "order": 2
        },
        {
            "id": "van_1",
            "title": "Company Van #1",
            "bgColor": "#16a085",
            "textColor": "white",
            "refiner": "vehicles",
            "order": 3
        },
        {
            "id": "van_2",
            "title": "Company Van #2",
            "bgColor": "#1abc9c",
            "textColor": "white",
            "refiner": "vehicles",
            "order": 4
        },
        {
            "id": "car_1",
            "title": "Company Car #1",
            "bgColor": "#2980b9",
            "textColor": "white",
            "refiner": "vehicles",
            "order": 5
        }
    ],
    "dynamic": null
}
```

### Scenario 3: Department-Based Event Categories

```json
{
    "isStaticValue": true,
    "staticValue": [
        {
            "id": "sales_meeting",
            "title": "Sales Meeting",
            "bgColor": "#e74c3c",
            "textColor": "white",
            "refiner": "departments",
            "order": 1
        },
        {
            "id": "sales_training",
            "title": "Sales Training",
            "bgColor": "#c0392b",
            "textColor": "white",
            "refiner": "departments",
            "order": 2
        },
        {
            "id": "hr_interview",
            "title": "HR Interview",
            "bgColor": "#3498db",
            "textColor": "white",
            "refiner": "departments",
            "order": 3
        },
        {
            "id": "hr_onboarding",
            "title": "HR Onboarding",
            "bgColor": "#2980b9",
            "textColor": "white",
            "refiner": "departments",
            "order": 4
        },
        {
            "id": "it_maintenance",
            "title": "IT Maintenance",
            "bgColor": "#95a5a6",
            "textColor": "white",
            "refiner": "departments",
            "order": 5
        }
    ],
    "dynamic": null
}
```

### Scenario 4: Priority and Status Indicators

```json
{
    "isStaticValue": true,
    "staticValue": [
        {
            "id": "priority_urgent",
            "title": "Urgent",
            "bgColor": "#c0392b",
            "textColor": "white",
            "refiner": "priority",
            "order": 1
        },
        {
            "id": "priority_high",
            "title": "High",
            "bgColor": "#e67e22",
            "textColor": "white",
            "refiner": "priority",
            "order": 2
        },
        {
            "id": "priority_normal",
            "title": "Normal",
            "bgColor": "#f39c12",
            "textColor": "black",
            "refiner": "priority",
            "order": 3
        },
        {
            "id": "priority_low",
            "title": "Low",
            "bgColor": "#95a5a6",
            "textColor": "white",
            "refiner": "priority",
            "order": 4
        }
    ],
    "dynamic": null
}
```

---

## Implementation Steps

### Option A: Static Refiner Values Setup

#### Step 1: Plan Your Refiner Values

1. List all refiner categories (from refiners configuration)
2. For each category, list all possible values
3. Assign unique IDs to each value
4. Choose appropriate colors for each value
5. Determine display order

#### Step 2: Create the Configuration

1. Create or open your JSON configuration file
2. Set `isStaticValue` to `true`
3. Build the `staticValue` array with all your values
4. Ensure each value has:
   - Unique `id`
   - Descriptive `title`
   - Color codes (or empty strings for defaults)
   - Correct `refiner` ID linking to parent refiner
   - Appropriate `order` value
5. Set `dynamic` to `null`
6. Validate JSON syntax

**Template:**
```json
{
    "isStaticValue": true,
    "staticValue": [
        {
            "id": "YOUR_UNIQUE_ID",
            "title": "Display Name",
            "bgColor": "#HEXCODE or empty",
            "textColor": "color name or empty",
            "refiner": "PARENT_REFINER_ID",
            "order": 1
        }
        // Add more values...
    ],
    "dynamic": null
}
```

#### Step 3: Apply to Calendar Control

**For Model-Driven Apps:**
1. Open Power Apps portal
2. Navigate to your Model-Driven App
3. Edit the form containing the calendar control
4. Select the calendar control
5. Find the "Refiner Values" property
6. Paste your JSON configuration
7. Save and publish the form

**For Canvas Apps:**
1. Open your Canvas App in Power Apps Studio
2. Select the calendar control
3. Find the "RefinerValues" property in the properties panel
4. Paste your JSON configuration
5. Save and publish the app

**For Custom Pages:**
1. Open your Custom Page
2. Select the calendar control
3. Find the "Refiner Values" property
4. Paste your JSON configuration
5. Save and publish

---

### Option B: Dynamic Refiner Values Setup

#### Step 1: Create the Dataverse Entity

1. Navigate to [Power Apps](https://make.powerapps.com)
2. Go to **Tables**
3. Click **+ New table** → **Add columns and data**
4. Name your table (e.g., "Calendar Refiner Values")
5. Add the following columns:

| Column Name | Data Type | Required | Description |
|-------------|-----------|----------|-------------|
| Title | Single line of text | Yes | Display name |
| Background Color | Single line of text | No | Hex color code |
| Text Color | Single line of text | No | Color name or hex |
| Refiner | Lookup | Yes | Link to parent refiner entity |
| Order | Whole number | Yes | Sort order |

#### Step 2: Configure the Lookup Relationship

1. For the "Refiner" field, set up a lookup to your refiner entity
2. Configure the relationship behavior (usually Referential, Restrict Delete)
3. Save the table configuration

#### Step 3: Populate the Entity

Add records for each refiner value:

**Example Data:**

| Title | Background Color | Text Color | Refiner | Order |
|-------|------------------|------------|---------|-------|
| Meeting Room 1 | #f70f0f | white | Meeting Room | 1 |
| Meeting Room 2 | #0ced35 | white | Meeting Room | 2 |
| Meeting Room 3 | #500de2ff | white | Meeting Room | 3 |
| Car 1 | #0ced35 | white | Car | 4 |
| Car 2 | | white | Car | 5 |
| Car 3 | #0c31ed | white | Car | 6 |

#### Step 4: Get Entity and Field Names

1. Open your table in Power Apps
2. Go to **Settings** → **Advanced settings**
3. Note the **Logical name** (e.g., `ltcal_refinervalues`)
4. For each field, note its **Logical name**:
   - ID: `ltcal_refinervaluesid` (auto-generated)
   - Title: `ltcal_title`
   - Background Color: `ltcal_bgcolor`
   - Text Color: `ltcal_textcolor`
   - Refiner: `ltcal_refiner`
   - Order: `ltcal_order`

#### Step 5: Create the Configuration

```json
{
    "isStaticValue": false,
    "staticValue": [],
    "dynamic": {
        "entityName": "YOUR_ENTITY_LOGICAL_NAME",
        "fields": {
            "id": "YOUR_ID_FIELD",
            "title": "YOUR_TITLE_FIELD",
            "bgColor": "YOUR_BGCOLOR_FIELD",
            "textColor": "YOUR_TEXTCOLOR_FIELD",
            "refiner": "YOUR_REFINER_LOOKUP_FIELD",
            "order": "YOUR_ORDER_FIELD"
        }
    }
}
```

Replace placeholders with your actual field names.

#### Step 6: Apply to Calendar Control

Follow the same steps as in Option A, Step 3.

---

## Linking Refiner Values to Calendar Events

After configuring refiner values, connect them to your calendar events:

### For Static Refiner Values

Your event entity needs a field that stores the refiner value ID:

**Option 1: Choice Field**
1. Add a Choice (Option Set) field to your event entity
2. Add options matching your refiner value IDs
3. When creating events, select the appropriate choice

**Option 2: Text Field**
1. Add a Single Line of Text field
2. Store the refiner value ID as text
3. Ensure IDs match exactly

### For Dynamic Refiner Values

Use a lookup field:

1. Add a Lookup field to your event entity
2. Point it to the refiner values entity
3. Name it appropriately (e.g., "Resource", "Room", "Vehicle")
4. When creating events, select from the dropdown

**Example Entity Structure:**

**Event Entity Fields:**
- Title (text)
- Start Date (date/time)
- End Date (date/time)
- Description (text)
- Resource (lookup to refiner values entity)

---

## Validation and Testing

### Step 1: Visual Verification

1. Open the calendar
2. Create test events with different refiner values
3. Verify colors display correctly:
   - Background colors match configuration
   - Text is readable (good contrast)
   - Empty color values use defaults

### Step 2: Filtering Test

1. Open the refiner panel
2. Select different refiner values
3. Verify events filter correctly
4. Test multi-value selection (if enabled)
5. Confirm color coding remains consistent

### Step 3: Ordering Test

1. Check that refiner values appear in correct order
2. Within each refiner category, values should be sorted by `order`
3. Test with multiple refiners to ensure proper grouping

### Step 4: Color Contrast Test

1. View calendar in different lighting conditions
2. Test with browser zoom at 150% and 200%
3. Consider color-blind users (use tools like Color Blindness Simulator)
4. Ensure text remains readable in all scenarios

---

## Troubleshooting

### Values Not Appearing

**Issue:** Refiner values don't show up in the calendar

**Solutions:**
- Verify `isStaticValue` matches your configuration type
- Check JSON syntax validity
- For dynamic: Ensure entity has active records
- Verify the refiner values entity is accessible to the app
- Check that `refiner` IDs match parent refiner IDs

### Colors Not Displaying

**Issue:** Background or text colors don't appear as configured

**Solutions:**
- Verify hex codes are valid (start with # and have 6 or 8 characters)
- Check for typos in color names
- Ensure color fields contain valid values
- Try removing alpha channel from 8-digit hex codes
- Test with basic colors first (e.g., "#ff0000" for red)

### Wrong Refiner Association

**Issue:** Values appear under wrong refiner category

**Solutions:**
- Verify `refiner` field values match parent refiner IDs exactly
- For dynamic: Check lookup relationships are correct
- Ensure refiner IDs are consistent across configurations
- Review both refiner and refiner values configurations

### Values in Wrong Order

**Issue:** Values don't appear in expected sequence

**Solutions:**
- Check `order` values are numeric and correct
- Ensure no duplicate order values within same refiner
- Verify order field type is number (not text)
- Sort order should be ascending (1, 2, 3...)

### Filter Not Working

**Issue:** Selecting values doesn't filter events

**Solutions:**
- Verify event records have refiner value field populated
- Check that event field stores correct refiner value IDs
- For dynamic: Ensure lookup relationship is established
- Verify field mapping in event configuration

### Poor Color Contrast

**Issue:** Text is hard to read on background

**Solutions:**
- Use high-contrast combinations (white/black text)
- Test with WCAG contrast checker tools
- Adjust background colors to lighter/darker shades
- Consider using only black or white for text colors

---

## Best Practices

### Design Guidelines

1. **Limit Values Per Refiner**: Keep to 20-30 values per refiner for usability
2. **Color Palette**: Use a consistent color palette across all values
3. **Meaningful Colors**: Use colors that make intuitive sense (red for urgent, green for available)
4. **Accessibility First**: Always ensure adequate contrast ratios
5. **Mobile Friendly**: Test colors on mobile devices

### Color Selection

**Good Practices:**
- Use brand colors for consistency
- Create color hierarchies (darker = higher priority)
- Group related values with similar color families
- Leave some values with default colors for flexibility

**Avoid:**
- Too many different colors (confusing)
- Similar shades that are hard to distinguish
- Low contrast combinations
- Overly bright or saturated colors

### Maintenance

1. **Regular Review**: Periodically review and update values
2. **Remove Obsolete**: Delete unused refiner values
3. **Document Colors**: Keep a color guide for reference
4. **Consistency Check**: Ensure colors align with organization standards
5. **User Feedback**: Collect feedback on color effectiveness

### Performance

1. **Limit Total Values**: Keep total count under 200 for best performance
2. **Optimize Queries**: For dynamic values, ensure proper indexing
3. **Cache Strategy**: Consider caching for frequently accessed values
4. **Lazy Loading**: For large datasets, implement pagination if available

---

## Advanced Topics

### Conditional Colors

For advanced scenarios where colors should change based on conditions:

1. Use Power Apps formulas to set refiner value dynamically
2. Create multiple refiner values with different colors for same resource
3. Apply logic in event creation to select appropriate value

### Hierarchical Values

For multi-level categorization:

1. Use naming conventions (e.g., "Room - Building A - Floor 1")
2. Create separate refiners for each level
3. Link values across levels using consistent IDs

### Custom Color Themes

To align with Power Apps themes:

1. Extract theme colors from your Power Apps theme
2. Use those hex codes in refiner values
3. Update when theme changes
4. Document color mappings

---

## Migration Guide

### From Static to Dynamic

**Steps:**
1. Export static values to Excel/CSV
2. Create Dataverse entity with required fields
3. Import data into entity
4. Update configuration to use dynamic mode
5. Test thoroughly
6. Keep static backup configuration

**Migration Script Template:**
```javascript
// Pseudocode for data migration
staticValues.forEach(value => {
    createRecord("ltcal_refinervalues", {
        title: value.title,
        bgcolor: value.bgColor,
        textcolor: value.textColor,
        refiner: lookupRefiner(value.refiner),
        order: value.order
    });
});
```

### From Dynamic to Static

**Steps:**
1. Export data from Dataverse entity
2. Convert to JSON array format
3. Update configuration to use static mode
4. Validate all IDs and colors
5. Test filtering functionality
6. Consider keeping entity for future use

---

## Integration with Other Configurations

### Required Configurations

1. **Refiners Configuration**: Must be configured first
2. **Main Configuration**: Set `useRefiners` to `true`
3. **Events Configuration**: Link events to refiner values

### Configuration Order

1. Set up refiners (categories)
2. Configure refiner values (options)
3. Map events to refiner values
4. Test end-to-end filtering

---

## Support and Resources

### Getting Help

For assistance with refiner values configuration:

- **Email:** support@ltaddins.com
- **Phone:** +84 946 579 539
- **Website:** [https://ltaddins.com](https://ltaddins.com)

### Related Documentation

- [Refiners Configuration Guide](./refiners.md)
- [Main Configuration Guide](./configuration.md)
- [Events Configuration Guide](./events.md)
- [Color Design Guidelines](./colors.md)

### Useful Tools

- **Color Picker:** [Google Color Picker](https://www.google.com/search?q=color+picker)
- **Contrast Checker:** [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- **Palette Generator:** [Coolors.co](https://coolors.co)
- **JSON Validator:** [JSONLint](https://jsonlint.com)

---

**Last Updated:** November 26, 2025  
**Version:** 1.0
