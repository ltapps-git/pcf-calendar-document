# LTAPPS Calendar PCF Control - Business Rules Configuration Guide

This guide provides detailed instructions on configuring business rules for the LTAPPS Calendar PCF Control. Business rules allow you to create dynamic, conditional behavior in the calendar, including custom highlights, action buttons, and callout field displays based on event data.

## Overview

Business rules enable you to:
- **Display conditional highlights** on events (left and right badges)
- **Show/hide action buttons** based on event properties
- **Customize callout fields** with icons and formatting
- **Create dynamic titles** from event data
- **Apply complex conditional logic** using field comparisons

Business rules make your calendar intelligent and responsive to data, providing users with relevant information and actions based on the context of each event.

---

## Configuration Structure

The business rules configuration is a JSON object with the following top-level structure:

```json
{
    "callout": {
        "highlights": {
            "highlightLeft": [],
            "highlightRight": []
        },
        "actionButton1": {},
        "actionButton2": {},
        "actionButton3": {},
        "actionButton4": {},
        "actionButton5": {},
        "actionButton6": {},
        "actionButton7": {},
        "actionButton8": {},
        "actionButton9": {},
        "fields": []
    }
}
```

---

## Callout Configuration

### Highlights

Highlights are visual indicators (badges) that appear on events in the calendar view. They can display on the left or right side of events.

#### `highlightLeft` and `highlightRight`

**Type:** `array of objects`  
**Default:** `[]`

Each highlight object can conditionally display a colored badge with a title.

#### Highlight Object Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `title` | `object` | Yes | Title configuration (static or dynamic) |
| `color` | `object` | Yes | Background and text color settings |
| `conditionsShow` | `array` | Yes | Conditions that determine when to show the highlight |

---

### Title Configuration

The title can be static text or dynamically pulled from event data.

#### Static Title

```json
"title": {
    "isStaticValue": true,
    "staticValue": "HighLight Left Title"
}
```

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `isStaticValue` | `boolean` | Yes | Set to `true` for static text |
| `staticValue` | `string` | Yes | The text to display |

#### Dynamic Title

```json
"title": {
    "isStaticValue": false,
    "dynamicField": {
        "name": "ltcal_title",
        "type": "SingleLineText"
    }
}
```

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `isStaticValue` | `boolean` | Yes | Set to `false` for dynamic field |
| `dynamicField` | `object` | Yes | Field configuration object |
| `dynamicField.name` | `string` | Yes | Logical name of the field |
| `dynamicField.type` | `string` | Yes | Data type of the field |

---

### Color Configuration

```json
"color": {
    "bgColor": "red",
    "textColor": "#FFFFFF"
}
```

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `bgColor` | `string` | Yes | Background color (hex code or color name) |
| `textColor` | `string` | Yes | Text color (hex code or color name) |

**Supported Formats:**
- Color names: `"red"`, `"green"`, `"blue"`, `"yellow"`, etc.
- Hex codes: `"#FFFFFF"`, `"#FF0000"`, `"#00FF00"`, etc.

---

### Conditions Configuration

Conditions determine when highlights or buttons should appear. They support complex logical expressions with AND/OR operators.

#### Condition Object Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `field` | `object` | Yes | The field to evaluate |
| `operator` | `string` | Yes | Comparison operator |
| `value` | `object` | Yes | Value to compare against |
| `andOr` | `string` | No | Logical operator for chaining (`"and"` or `"or"`) |

---

### Field Configuration

```json
"field": {
    "name": "ltcal_isrecurring",
    "type": "TwoOptions"
}
```

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `name` | `string` | Yes | Logical name of the field |
| `type` | `string` | Yes | Data type of the field |

**Supported Field Types:**
- `SingleLineText` - Text fields
- `MultiLineText` - Multi-line text fields
- `TwoOptions` - Boolean/Yes-No fields
- `Number` - Numeric fields (integer or decimal)
- `Currency` - Currency fields
- `DateOnly` - Date-only fields
- `DateAndTime` - Date and time fields
- `OptionSet` - Choice fields
- `Lookup` - Lookup fields (not supported in Canvas Apps and Custom Pages)

> **Note:** The `Lookup` field type is only supported in Model-Driven Apps. It is **not supported** in Canvas Apps and Custom Pages.

---

### Operators

| Operator | Description | Supported Types |
|----------|-------------|-----------------|
| `eq` | Equal to | All types |
| `ne` | Not equal to | All types |
| `gt` | Greater than | Number, Currency, Date fields |
| `ge` | Greater than or equal | Number, Currency, Date fields |
| `lt` | Less than | Number, Currency, Date fields |
| `le` | Less than or equal | Number, Currency, Date fields |
| `ct` | Contains text | Text fields |
| `nc` | Not contains text | Text fields |

---

### Value Configuration

Values can be static or dynamically compared to another field.

#### Static Value

```json
"value": {
    "isStaticValue": true,
    "staticValue": true
}
```

```json
"value": {
    "isStaticValue": true,
    "staticValue": "Normal Event"
}
```

```json
"value": {
    "isStaticValue": true,
    "staticValue": 22
}
```

```json
"value": {
    "isStaticValue": true,
    "staticValue": "2025-11-14T04:13:39.022Z"
}
```

#### Dynamic Value (Field Comparison)

```json
"value": {
    "isStaticValue": false,
    "dynamicField": {
        "name": "ltcal_testdatetime",
        "type": "DateAndTime"
    }
}
```

#### Combined (Static with Dynamic Fallback)

```json
"value": {
    "isStaticValue": true,
    "staticValue": "2025-11-14T04:13:39.022Z",
    "dynamicField": {
        "name": "ltcal_testdatetime",
        "type": "DateAndTime"
    }
}
```

---

### Logical Operators (AND/OR)

Use the `andOr` property to chain multiple conditions:

- `"and"` - All conditions must be true
- `"or"` - At least one condition must be true
- If `andOr` is omitted on the last condition, it defaults to AND

**Example - OR Logic:**
```json
"conditionsShow": [
    {
        "field": { "name": "ltcal_isrecurring", "type": "TwoOptions" },
        "operator": "eq",
        "value": { "isStaticValue": true, "staticValue": true },
        "andOr": "or"
    },
    {
        "field": { "name": "ltcal_title", "type": "SingleLineText" },
        "operator": "eq",
        "value": { "isStaticValue": true, "staticValue": "Normal Event" }
    }
]
```

**Example - AND Logic:**
```json
"conditionsShow": [
    {
        "field": { "name": "ltcal_priority", "type": "Number" },
        "operator": "gt",
        "value": { "isStaticValue": true, "staticValue": 3 },
        "andOr": "and"
    },
    {
        "field": { "name": "ltcal_status", "type": "SingleLineText" },
        "operator": "eq",
        "value": { "isStaticValue": true, "staticValue": "Active" }
    }
]
```

---

## Action Buttons Configuration

The calendar callout supports up to 9 custom action buttons. Each button can have conditional visibility.

### Action Button Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `title` | `string` | Yes | Button label text |
| `conditionsShow` | `array` | No | Conditions for showing the button (optional) |

**Example:**
```json
"actionButton1": {
    "title": "Button 1",
    "conditionsShow": [
        {
            "field": { "name": "ltcal_isrecurring", "type": "TwoOptions" },
            "operator": "eq",
            "value": { "isStaticValue": true, "staticValue": true }
        }
    ]
}
```

**Button without conditions (always visible):**
```json
"actionButton3": {
    "title": "Button 3"
}
```

---

## Callout Fields Configuration

Define which fields appear in the event callout and their icons.

### Fields Array

**Type:** `array of objects`

Each field object specifies a data field to display in the callout.

#### Field Object Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `field` | `object` | Yes | Field configuration |
| `field.name` | `string` | Yes | Logical name of the field |
| `field.type` | `string` | Yes | Data type of the field (see supported types below) |
| `iconName` | `string` | Yes | Icon name from the supported icons list |

> **Important:** When configuring callout fields for Canvas Apps or Custom Pages, do not use `Lookup` field type as it is not supported. Use other field types like `SingleLineText`, `Number`, `DateAndTime`, etc.

**Example:**
```json
{
    "field": {
        "name": "ltcal_title",
        "type": "SingleLineText"
    },
    "iconName": "location"
}
```

### Supported Icons

The following icon names are supported by the LTAPPS Calendar control:

| Icon Name | Use Case |
|-----------|----------|
| `location` | Location/address fields |
| `map` | Map references |
| `mail` | Email addresses |
| `phone` | Phone numbers |
| `call` | Call actions or phone fields |
| `accesstime` | Access time or time-based fields |
| `clock` | Time/duration fields |
| `checkmark` | Status/completion indicators |
| `info` | General information or help text |
| `comment` | Comments or feedback |
| `chat` | Chat messages or discussions |
| `note` | Notes or descriptions |
| `person` | Single user/owner fields |
| `contact` | Contact information |
| `people` | Attendees/participants or groups |
| `numberfield` | Numeric fields |
| `calculator` | Calculation or computed fields |
| `money` | Currency or financial fields |
| `payment` | Payment-related fields |
| `receipt` | References/IDs or transaction records |

---

## Complete Configuration Examples

### Example 1: Event Status Highlights

```json
{
    "callout": {
        "highlights": {
            "highlightLeft": [
                {
                    "title": {
                        "isStaticValue": true,
                        "staticValue": "Urgent"
                    },
                    "color": {
                        "bgColor": "#c0392b",
                        "textColor": "#FFFFFF"
                    },
                    "conditionsShow": [
                        {
                            "field": {
                                "name": "ltcal_priority",
                                "type": "OptionSet"
                            },
                            "operator": "eq",
                            "value": {
                                "isStaticValue": true,
                                "staticValue": 1
                            }
                        }
                    ]
                },
                {
                    "title": {
                        "isStaticValue": true,
                        "staticValue": "Recurring"
                    },
                    "color": {
                        "bgColor": "#3498db",
                        "textColor": "#FFFFFF"
                    },
                    "conditionsShow": [
                        {
                            "field": {
                                "name": "ltcal_isrecurring",
                                "type": "TwoOptions"
                            },
                            "operator": "eq",
                            "value": {
                                "isStaticValue": true,
                                "staticValue": true
                            }
                        }
                    ]
                }
            ],
            "highlightRight": [
                {
                    "title": {
                        "isStaticValue": false,
                        "dynamicField": {
                            "name": "ltcal_status",
                            "type": "SingleLineText"
                        }
                    },
                    "color": {
                        "bgColor": "#27ae60",
                        "textColor": "#FFFFFF"
                    },
                    "conditionsShow": [
                        {
                            "field": {
                                "name": "ltcal_status",
                                "type": "SingleLineText"
                            },
                            "operator": "eq",
                            "value": {
                                "isStaticValue": true,
                                "staticValue": "Confirmed"
                            }
                        }
                    ]
                }
            ]
        },
        "actionButton1": {
            "title": "Mark Complete"
        },
        "actionButton2": {
            "title": "Cancel Event"
        },
        "fields": [
            {
                "field": {
                    "name": "ltcal_title",
                    "type": "SingleLineText"
                },
                "iconName": "info"
            },
            {
                "field": {
                    "name": "ltcal_location",
                    "type": "SingleLineText"
                },
                "iconName": "location"
            },
            {
                "field": {
                    "name": "createdby",
                    "type": "Lookup"
                },
                "iconName": "person"
            }
        ]
    }
}
```

### Example 2: Resource Booking Rules

```json
{
    "callout": {
        "highlights": {
            "highlightLeft": [
                {
                    "title": {
                        "isStaticValue": true,
                        "staticValue": "Approved"
                    },
                    "color": {
                        "bgColor": "green",
                        "textColor": "white"
                    },
                    "conditionsShow": [
                        {
                            "field": {
                                "name": "ltcal_approvalstatus",
                                "type": "OptionSet"
                            },
                            "operator": "eq",
                            "value": {
                                "isStaticValue": true,
                                "staticValue": 2
                            }
                        }
                    ]
                },
                {
                    "title": {
                        "isStaticValue": true,
                        "staticValue": "Pending"
                    },
                    "color": {
                        "bgColor": "orange",
                        "textColor": "white"
                    },
                    "conditionsShow": [
                        {
                            "field": {
                                "name": "ltcal_approvalstatus",
                                "type": "OptionSet"
                            },
                            "operator": "eq",
                            "value": {
                                "isStaticValue": true,
                                "staticValue": 1
                            }
                        }
                    ]
                }
            ],
            "highlightRight": []
        },
        "actionButton1": {
            "title": "Approve",
            "conditionsShow": [
                {
                    "field": {
                        "name": "ltcal_approvalstatus",
                        "type": "OptionSet"
                    },
                    "operator": "eq",
                    "value": {
                        "isStaticValue": true,
                        "staticValue": 1
                    }
                }
            ]
        },
        "actionButton2": {
            "title": "Reject",
            "conditionsShow": [
                {
                    "field": {
                        "name": "ltcal_approvalstatus",
                        "type": "OptionSet"
                    },
                    "operator": "eq",
                    "value": {
                        "isStaticValue": true,
                        "staticValue": 1
                    }
                }
            ]
        },
        "actionButton3": {
            "title": "View Details"
        },
        "fields": [
            {
                "field": {
                    "name": "ltcal_resourcename",
                    "type": "SingleLineText"
                },
                "iconName": "receipt"
            },
            {
                "field": {
                    "name": "ltcal_bookingpurpose",
                    "type": "MultiLineText"
                },
                "iconName": "comment"
            },
            {
                "field": {
                    "name": "ltcal_requestedby",
                    "type": "Lookup"
                },
                "iconName": "person"
            }
        ]
    }
}
```

### Example 3: Date-Based Conditions

```json
{
    "callout": {
        "highlights": {
            "highlightLeft": [
                {
                    "title": {
                        "isStaticValue": true,
                        "staticValue": "Overdue"
                    },
                    "color": {
                        "bgColor": "#e74c3c",
                        "textColor": "#FFFFFF"
                    },
                    "conditionsShow": [
                        {
                            "field": {
                                "name": "ltcal_duedate",
                                "type": "DateOnly"
                            },
                            "operator": "lt",
                            "value": {
                                "isStaticValue": true,
                                "staticValue": "2025-11-26T00:00:00.000Z"
                            }
                        }
                    ]
                },
                {
                    "title": {
                        "isStaticValue": true,
                        "staticValue": "Upcoming"
                    },
                    "color": {
                        "bgColor": "#f39c12",
                        "textColor": "#FFFFFF"
                    },
                    "conditionsShow": [
                        {
                            "field": {
                                "name": "ltcal_startdate",
                                "type": "DateAndTime"
                            },
                            "operator": "gt",
                            "value": {
                                "isStaticValue": true,
                                "staticValue": "2025-11-26T00:00:00.000Z"
                            },
                            "andOr": "and"
                        },
                        {
                            "field": {
                                "name": "ltcal_startdate",
                                "type": "DateAndTime"
                            },
                            "operator": "lt",
                            "value": {
                                "isStaticValue": true,
                                "staticValue": "2025-12-01T00:00:00.000Z"
                            }
                        }
                    ]
                }
            ],
            "highlightRight": []
        },
        "actionButton1": {
            "title": "Reschedule"
        },
        "fields": [
            {
                "field": {
                    "name": "ltcal_title",
                    "type": "SingleLineText"
                },
                "iconName": "info"
            },
            {
                "field": {
                    "name": "ltcal_startdate",
                    "type": "DateAndTime"
                },
                "iconName": "clock"
            }
        ]
    }
}
```

### Example 4: Complex Multi-Field Conditions

```json
{
    "callout": {
        "highlights": {
            "highlightLeft": [
                {
                    "title": {
                        "isStaticValue": true,
                        "staticValue": "High Value"
                    },
                    "color": {
                        "bgColor": "#2ecc71",
                        "textColor": "#FFFFFF"
                    },
                    "conditionsShow": [
                        {
                            "field": {
                                "name": "ltcal_estimatedvalue",
                                "type": "Currency"
                            },
                            "operator": "gte",
                            "value": {
                                "isStaticValue": true,
                                "staticValue": 10000
                            },
                            "andOr": "and"
                        },
                        {
                            "field": {
                                "name": "ltcal_probability",
                                "type": "Number"
                            },
                            "operator": "gt",
                            "value": {
                                "isStaticValue": true,
                                "staticValue": 75
                            }
                        }
                    ]
                }
            ],
            "highlightRight": [
                {
                    "title": {
                        "isStaticValue": false,
                        "dynamicField": {
                            "name": "ltcal_category",
                            "type": "SingleLineText"
                        }
                    },
                    "color": {
                        "bgColor": "#9b59b6",
                        "textColor": "#FFFFFF"
                    },
                    "conditionsShow": [
                        {
                            "field": {
                                "name": "ltcal_category",
                                "type": "SingleLineText"
                            },
                            "operator": "ne",
                            "value": {
                                "isStaticValue": true,
                                "staticValue": ""
                            }
                        }
                    ]
                }
            ]
        },
        "actionButton1": {
            "title": "View Forecast"
        },
        "fields": [
            {
                "field": {
                    "name": "ltcal_title",
                    "type": "SingleLineText"
                },
                "iconName": "info"
            },
            {
                "field": {
                    "name": "ltcal_estimatedvalue",
                    "type": "Currency"
                },
                "iconName": "money"
            },
            {
                "field": {
                    "name": "ltcal_probability",
                    "type": "Number"
                },
                "iconName": "calculator"
            }
        ]
    }
}
```

---

## Implementation Steps

### Step 1: Plan Your Business Rules

1. **Identify Use Cases**: Determine what dynamic behavior you need
2. **Define Highlights**: Plan left/right highlight badges and their conditions
3. **List Action Buttons**: Decide which buttons to show and when
4. **Select Callout Fields**: Choose which fields to display in event callouts
5. **Map Data Types**: Document field names and types from your entity

### Step 2: Create the Configuration

1. Start with the base structure
2. Configure highlights with conditions
3. Set up action buttons
4. Define callout fields with icons
5. Validate JSON syntax

### Step 3: Test Conditions

1. Create test events with different field values
2. Verify highlights appear correctly
3. Test button visibility based on conditions
4. Ensure callout fields display properly
5. Test edge cases and complex conditions

### Step 4: Apply to Calendar Control

**For Model-Driven Apps:**
1. Navigate to your Model-Driven App
2. Edit the form with the calendar control
3. Select the calendar control
4. Find the "Business Rules" property
5. Paste your JSON configuration
6. Save and publish

**For Canvas Apps:**
1. Open your Canvas App
2. Select the calendar control
3. Find the "BusinessRules" property
4. Paste your JSON configuration
5. Save and publish

**For Custom Pages:**
1. Open your Custom Page
2. Select the calendar control
3. Find the "Business Rules" property
4. Paste your JSON configuration
5. Save and publish

---

## Handling Action Button Clicks

Action buttons trigger callbacks in your app. You need to handle these events:

### Model-Driven Apps

There are two scenarios for handling action button clicks in Model-Driven Apps, depending on where the calendar control is placed:

#### Case 1: Calendar Control Added to a View

When the calendar control is added to a view (list view), action button callbacks are **not supported**. In this scenario:

- Clicking an action button will open the default Dataverse form for the event
- No custom callback logic can be executed
- This is the standard behavior for view-level controls

**Use this approach when:**
- You want simple, out-of-the-box behavior
- Custom button actions are not required
- Users should be directed to the standard form

#### Case 2: Calendar Control Added to a SubGrid in a Form

When the calendar control is added as a subgrid within a form, you can handle action button clicks using JavaScript event handlers. This provides full control over button behavior.

**Implementation Steps:**

1. **Add the calendar control to a subgrid** on your form
2. **Create a Form JavaScript library** with the event handler
3. **Register the JavaScript** on the form's OnLoad event
4. **Handle the postMessage events** from the PCF control

**Example Implementation:**

```javascript
function onFormLoad(executionContext) {
    const formCtx = executionContext.getFormContext();

    const handlePcfMessage = (data) => {
        const payload = data?.data;
        
        // Check if the message is from the calendar control
        if (payload?.controlName == "pcfLTAPPSCalendar") {
            switch (payload?.actionName) {
                case "onNewEvent":
                    console.log("New event created:", payload);
                    Xrm.Navigation.openForm({
                        entityName: "ltcal_event",
                        openInNewWindow: false
                    });
                    break;

                case "onDateChanged":
                    console.log("Date changed to:", payload);
                    // Handle date change logic here
                    break;

                case "onOpenEvent":
                    console.log("Open event with data:", payload);
                    Xrm.Navigation.openForm({
                        entityName: "ltcal_event",
                        entityId: payload?.data,
                        openInNewWindow: false
                    });
                    break;

                case "onAction1":
                    console.log("Action 1 triggered with data:", payload);
                    // Custom logic for Action Button 1
                    Xrm.Navigation.openForm({
                        entityName: "ltcal_event",
                        entityId: payload?.data,
                        openInNewWindow: false
                    });
                    break;

                case "onAction2":
                    console.log("Action 2 triggered with data:", payload);
                    // Custom logic for Action Button 2
                    break;

                case "onAction3":
                    console.log("Action 3 triggered with data:", payload);
                    // Custom logic for Action Button 3
                    break;

                case "onAction4":
                    console.log("Action 4 triggered with data:", payload);
                    // Custom logic for Action Button 4
                    break;

                case "onAction5":
                    console.log("Action 5 triggered with data:", payload);
                    // Custom logic for Action Button 5
                    break;

                case "onAction6":
                    console.log("Action 6 triggered with data:", payload);
                    // Custom logic for Action Button 6
                    break;

                case "onAction7":
                    console.log("Action 7 triggered with data:", payload);
                    // Custom logic for Action Button 7
                    break;

                case "onAction8":
                    console.log("Action 8 triggered with data:", payload);
                    // Custom logic for Action Button 8
                    break;

                case "onAction9":
                    console.log("Action 9 triggered with data:", payload);
                    // Custom logic for Action Button 9
                    break;
            }
        }
    };

    // Register the message listener
    const host = window.top;
    host.addEventListener("message", handlePcfMessage, false);

    // Clean up the listener when the form is saved
    formCtx.data.entity.addOnSave(() => {
        host.removeEventListener("message", handlePcfMessage);
    });
}
```

**Key Points:**

- **controlName**: Always check that `payload?.controlName == "pcfLTAPPSCalendar"` to ensure the message is from the calendar control
- **actionName**: The action names correspond to button clicks:
  - `"onAction1"` through `"onAction9"` for the 9 action buttons
  - `"onNewEvent"` when the new event button is clicked
  - `"onOpenEvent"` when an event is clicked
  - `"onDateChanged"` when the calendar date changes
- **payload?.data**: Contains the event ID or relevant data for the action
- **Cleanup**: Always remove event listeners on form save to prevent memory leaks

**Registering the JavaScript:**

1. Upload your JavaScript file to your solution
2. Open your form in the form designer
3. Go to **Form Properties** → **Form Libraries**
4. Add your JavaScript library
5. In **Event Handlers**, add a handler for **OnLoad** event
6. Select your `onFormLoad` function
7. Save and publish the form

**Use this approach when:**
- You need custom logic for button actions
- You want to integrate with other form components
- You need to perform validation or business logic before opening forms
- You want to call custom APIs or workflows

### Canvas Apps

In Canvas Apps, you can handle action button clicks by using the `OnChange` event of the calendar control. The control exposes an `eventActions` property that contains information about the triggered action.

**eventActions Property Format:**

The `eventActions` property returns an object with the following structure:

```javascript
{
    actionName: "actionName",
    data: "event_id_or_data"
}
```

- **actionName**: String indicating which action was triggered
- **data**: The event ID (if available) or associated data

**Implementation Steps:**

1. **Select the calendar control** in your Canvas App
2. **Edit the OnChange event** in the formula bar
3. **Access the eventActions property** to get action details
4. **Implement your custom logic** based on the action

**Example Implementation:**

```javascript
// OnChange event of the calendar control
Set(varOutput, Calendar4.eventActions);
Notify("Custom event fired! New value: " & varOutput);
```

**Complete Example with Action Handling:**

```javascript
// OnChange event of the calendar control
Set(varEventAction, Calendar4.eventActions);

// Parse the action and handle accordingly
If(
    varEventAction.actionName = "onAction1",
    /* Handle Action Button 1 */
    Navigate(DetailsScreen, Fade, {EventID: varEventAction.data});
    Notify("Action 1 executed", NotificationType.Success),
    
    varEventAction.actionName = "onAction2",
    /* Handle Action Button 2 */
    Patch(
        Events,
        LookUp(Events, ID = varEventAction.data),
        {Status: "Approved"}
    );
    Notify("Action 2 executed - Event approved", NotificationType.Success),
    
    varEventAction.actionName = "onAction3",
    /* Handle Action Button 3 */
    Set(varSelectedEventID, varEventAction.data);
    Set(varShowDialog, true);
    Notify("Action 3 executed", NotificationType.Success),
    
    varEventAction.actionName = "onAction4",
    /* Handle Action Button 4 */
    Notify("Action 4 executed with ID: " & varEventAction.data, NotificationType.Success),
    
    varEventAction.actionName = "onAction5",
    /* Handle Action Button 5 */
    Notify("Action 5 executed", NotificationType.Success),
    
    varEventAction.actionName = "onAction6",
    /* Handle Action Button 6 */
    Notify("Action 6 executed", NotificationType.Success),
    
    varEventAction.actionName = "onAction7",
    /* Handle Action Button 7 */
    Notify("Action 7 executed", NotificationType.Success),
    
    varEventAction.actionName = "onAction8",
    /* Handle Action Button 8 */
    Notify("Action 8 executed", NotificationType.Success),
    
    varEventAction.actionName = "onAction9",
    /* Handle Action Button 9 */
    Notify("Action 9 executed", NotificationType.Success),
    
    varEventAction.actionName = "onNewEvent",
    /* Handle New Event button */
    Navigate(NewEventScreen, ScreenTransition.None),
    
    varEventAction.actionName = "onOpenEvent",
    /* Handle event click */
    Navigate(EventDetailsScreen, Fade, {EventID: varEventAction.data}),
    
    varEventAction.actionName = "onDateChanged",
    /* Handle date change */
    Set(varSelectedDate, varEventAction.data);
    Notify("Date changed", NotificationType.Information)
);
```

**Available Action Names:**

The `actionName` property returns a string indicating which action was triggered:

| Action Name | Description | Data Content |
|-------------|-------------|--------------|
| `"onAction1"` | Action Button 1 clicked | Event ID |
| `"onAction2"` | Action Button 2 clicked | Event ID |
| `"onAction3"` | Action Button 3 clicked | Event ID |
| `"onAction4"` | Action Button 4 clicked | Event ID |
| `"onAction5"` | Action Button 5 clicked | Event ID |
| `"onAction6"` | Action Button 6 clicked | Event ID |
| `"onAction7"` | Action Button 7 clicked | Event ID |
| `"onAction8"` | Action Button 8 clicked | Event ID |
| `"onAction9"` | Action Button 9 clicked | Event ID |
| `"onNewEvent"` | New Event button clicked | Empty or null |
| `"onOpenEvent"` | Event item clicked | Event ID |
| `"onDateChanged"` | Calendar date changed | Selected date |

**Accessing Event Data:**

The `data` property contains the event ID or relevant data:

```javascript
// Get the action details
Set(varEventAction, Calendar4.eventActions);

// Access the action name
Set(varActionName, varEventAction.actionName);

// Access the event ID or data
Set(varEventID, varEventAction.data);

// Use in a LookUp
Set(varEventDetails, LookUp(Events, ID = varEventAction.data));
```

**Using Switch for Cleaner Code:**

```javascript
// OnChange event with Switch
Set(varEventAction, Calendar4.eventActions);

Switch(
    varEventAction.actionName,
    
    "onAction1",
        Navigate(ApprovalScreen, Fade, {EventID: varEventAction.data}),
    
    "onAction2",
        Patch(Events, LookUp(Events, ID = varEventAction.data), {Status: "Rejected"}),
    
    "onAction3",
        Set(varEditEventID, varEventAction.data);
        Navigate(EditScreen, Fade),
    
    "onOpenEvent",
        Navigate(DetailsScreen, Fade, {EventID: varEventAction.data}),
    
    "onDateChanged",
        Set(varCurrentDate, varEventAction.data);
        Refresh(Events)
);
```

**Best Practices:**

1. **Use Variables**: Store the `eventActions` object in a variable for better readability
2. **Check for Blank**: Verify the action object exists before processing
3. **Access Properties**: Use dot notation to access `actionName` and `data`
4. **User Feedback**: Use `Notify()` to provide feedback to users
5. **Error Handling**: Wrap critical operations in error handling logic
6. **Testing**: Test each action button thoroughly before deployment

**Example with Validation:**

```javascript
// OnChange event with validation
Set(varEventAction, Calendar4.eventActions);

If(
    !IsBlank(varEventAction) && !IsBlank(varEventAction.actionName),
    
    // Handle the action
    Switch(
        varEventAction.actionName,
        "onAction1", 
            If(
                !IsBlank(varEventAction.data),
                Navigate(Screen1, Fade, {EventID: varEventAction.data}),
                Notify("No event data available", NotificationType.Warning)
            ),
        "onAction2", 
            Patch(Events, LookUp(Events, ID = varEventAction.data), {Status: "Updated"}),
        "onAction3", 
            Set(varDialog, true)
    )
);
```

**Debugging Tips:**

To see the full event action object structure:

```javascript
// Display the full object for debugging
Set(varEventAction, Calendar4.eventActions);
Set(varDebugInfo, 
    "Action: " & varEventAction.actionName & 
    ", Data: " & Text(varEventAction.data)
);
Notify(varDebugInfo, NotificationType.Information);
```

### Custom Pages

Similar to Canvas Apps, handle button events using Power Fx formulas.

---

## Best Practices

### Condition Design

1. **Keep It Simple**: Start with basic conditions and add complexity gradually
2. **Test Thoroughly**: Test all condition combinations
3. **Use Meaningful Operators**: Choose operators that match your logic
4. **Document Logic**: Comment your configuration or maintain separate documentation
5. **Consider Performance**: Complex conditions may impact rendering speed

### Highlight Usage

1. **Limit Highlights**: Use 1-3 highlights per side to avoid clutter
2. **Distinct Colors**: Use clearly different colors for different highlights
3. **Meaningful Titles**: Use short, descriptive titles
4. **Priority Order**: Configure most important highlights first
5. **Consistent Design**: Use the same color scheme across similar conditions

### Action Buttons

1. **Clear Labels**: Use action-oriented button text ("Approve", "Edit", "Delete")
2. **Limit Count**: Only show buttons that add value (4 or fewer is ideal)
3. **Conditional Display**: Hide buttons when not applicable
4. **User Permissions**: Consider user roles in your conditions
5. **Handle Clicks**: Always implement click handlers for all visible buttons

### Callout Fields

1. **Relevant Information**: Only show fields users need to see
2. **Logical Order**: Arrange fields from most to least important
3. **Appropriate Icons**: Choose icons that match field purpose
4. **Limit Count**: Show 5-8 fields maximum for readability
5. **Field Types**: Consider how different data types render

### Performance

1. **Optimize Conditions**: Avoid unnecessary complexity
2. **Field Selection**: Only include fields that are needed
3. **Test with Real Data**: Use production-like datasets for testing
4. **Monitor Performance**: Check calendar responsiveness with rules applied
5. **Iterate**: Refine rules based on user feedback

---

## Troubleshooting

### Highlights Not Showing

**Issue:** Configured highlights don't appear on events

**Solutions:**
- Verify field names match exactly (case-sensitive)
- Check that field types are correct
- Ensure events have data in the fields being evaluated
- Verify operators are appropriate for the field types
- Test with simpler conditions first
- Check for JSON syntax errors

### Wrong Highlight Color

**Issue:** Highlight displays but with wrong colors

**Solutions:**
- Verify color format (hex codes start with #)
- Check for typos in color names
- Ensure sufficient contrast between background and text
- Test with basic colors first (red, green, blue)

### Conditions Not Evaluating Correctly

**Issue:** Conditions don't trigger as expected

**Solutions:**
- Verify AND/OR logic is correct
- Check date formats (use ISO 8601: YYYY-MM-DDTHH:mm:ss.sssZ)
- Ensure numeric values don't have quotes
- Boolean values should be `true`/`false` not strings
- Verify field values in events match expected values

### Action Buttons Not Appearing

**Issue:** Configured buttons don't show in callout

**Solutions:**
- Check button title is set
- Verify condition logic if conditional display is used
- Ensure button names are correct (actionButton1-9)
- Test without conditions first
- Verify JSON structure is correct

### Callout Fields Not Displaying

**Issue:** Fields don't show in event callout

**Solutions:**
- Verify field names are correct (logical names)
- Check field types match actual Dataverse types
- Ensure events have values in those fields
- Verify icon names are valid Fluent UI icons
- Check that fields array is properly formatted

### Dynamic Titles Not Working

**Issue:** Dynamic field values don't show in highlight titles

**Solutions:**
- Ensure `isStaticValue` is set to `false`
- Verify `dynamicField` is properly configured
- Check that field has data in events
- Confirm field type matches actual field
- Test with static value first to isolate issue

---

## Advanced Scenarios

### Comparing Two Date Fields

Check if one date is after another:

```json
"conditionsShow": [
    {
        "field": {
            "name": "ltcal_actualenddate",
            "type": "DateAndTime"
        },
        "operator": "gt",
        "value": {
            "isStaticValue": false,
            "dynamicField": {
                "name": "ltcal_plannedenddate",
                "type": "DateAndTime"
            }
        }
    }
]
```

### Text Contains Logic

Check if a text field contains specific text:

```json
"conditionsShow": [
    {
        "field": {
            "name": "ltcal_description",
            "type": "MultiLineText"
        },
        "operator": "contains",
        "value": {
            "isStaticValue": true,
            "staticValue": "urgent"
        }
    }
]
```

### Multiple Highlights Based on Priority

Show different highlights for different priority levels:

```json
"highlightLeft": [
    {
        "title": { "isStaticValue": true, "staticValue": "P1" },
        "color": { "bgColor": "#c0392b", "textColor": "white" },
        "conditionsShow": [
            {
                "field": { "name": "ltcal_priority", "type": "Number" },
                "operator": "eq",
                "value": { "isStaticValue": true, "staticValue": 1 }
            }
        ]
    },
    {
        "title": { "isStaticValue": true, "staticValue": "P2" },
        "color": { "bgColor": "#e67e22", "textColor": "white" },
        "conditionsShow": [
            {
                "field": { "name": "ltcal_priority", "type": "Number" },
                "operator": "eq",
                "value": { "isStaticValue": true, "staticValue": 2 }
            }
        ]
    },
    {
        "title": { "isStaticValue": true, "staticValue": "P3" },
        "color": { "bgColor": "#f39c12", "textColor": "white" },
        "conditionsShow": [
            {
                "field": { "name": "ltcal_priority", "type": "Number" },
                "operator": "eq",
                "value": { "isStaticValue": true, "staticValue": 3 }
            }
        ]
    }
]
```

### Conditional Button Based on User

Show buttons only for specific user roles (requires custom field):

```json
"actionButton1": {
    "title": "Approve",
    "conditionsShow": [
        {
            "field": {
                "name": "ltcal_userrole",
                "type": "SingleLineText"
            },
            "operator": "eq",
            "value": {
                "isStaticValue": true,
                "staticValue": "Manager"
            }
        }
    ]
}
```

---

## Date Format Reference

For date comparisons, always use ISO 8601 format:

**Format:** `YYYY-MM-DDTHH:mm:ss.sssZ`

**Examples:**
- `"2025-11-26T00:00:00.000Z"` - November 26, 2025 at midnight UTC
- `"2025-12-31T23:59:59.999Z"` - End of December 31, 2025
- `"2025-01-01T12:00:00.000Z"` - January 1, 2025 at noon UTC

**Tips:**
- Always include the `T` separator
- Always include the `Z` suffix for UTC
- Use `.000` for milliseconds if not needed
- Date-only fields still use full ISO format

---

## Testing Checklist

- [ ] All highlights display with correct colors
- [ ] Conditions evaluate correctly for test events
- [ ] Action buttons appear when conditions are met
- [ ] Action buttons trigger correct handlers
- [ ] Callout fields show appropriate data
- [ ] Icons display correctly next to field values
- [ ] Dynamic titles pull correct field values
- [ ] AND/OR logic works as expected
- [ ] Date comparisons work correctly
- [ ] Numeric comparisons work correctly
- [ ] Text comparisons work correctly
- [ ] Boolean conditions work correctly
- [ ] Edge cases handled (null values, empty strings)
- [ ] Performance is acceptable with rules applied
- [ ] Mobile view displays correctly

---

## Support and Resources

### Getting Help

For assistance with business rules configuration:

- **Email:** support@ltaddins.com
- **Phone:** +84 946 579 539
- **Website:** [https://ltaddins.com](https://ltaddins.com)

### Related Documentation

- [Main Configuration Guide](./configuration.md)
- [Refiners Configuration Guide](./refiners.md)
- [Refiner Values Configuration Guide](./refinerValues.md)
- [Events Configuration Guide](./events.md)

### Useful Resources

- [ISO 8601 Date Format](https://en.wikipedia.org/wiki/ISO_8601)
- [JSON Validator](https://jsonlint.com)
- [Color Picker](https://www.google.com/search?q=color+picker)

---

**Last Updated:** November 26, 2025  
**Version:** 1.0
