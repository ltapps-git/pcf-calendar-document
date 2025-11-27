function onFormLoad(executionContext) {
    const formCtx = executionContext.getFormContext();

    const handlePcfMessage = (data) => {
        const payload = data?.data;
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
                    Xrm.Navigation.openForm({
                        entityName: "ltcal_event",
                        entityId: payload?.data,
                        openInNewWindow: false
                    });
                    break;
            }
        };
    }
    const host = window.top;
    host.addEventListener("message", handlePcfMessage, false);

    formCtx.data.entity.addOnSave(() => {
        host.removeEventListener("message", handlePcfMessage);
    });
}
