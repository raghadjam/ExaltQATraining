*** Variables ***
${BASE_URL}               http://localhost:3000
${ADD_ORDER}              /addOrder 
${DELETE_ORDER}           /deleteOrder

${INVALID_PASS}           999999
${STAGES_COUNT}           6


@{EXPECTED_STAGES}        Stage 1: Order Received    Stage 2: Order Shipped    Stage 3: Order Received to Destination Country    Stage 4: Order Clearance Completed    Stage 5: Order in Delivery Stage    Stage 6: Order Delivered
${KEY_TRACKING_ID}        trackingId
${KEY_PASSWORD}           password
${REJECTION_ERROR}        Please provide a reason for rejection
${SHIPMENT_SUCESS}        Shipment stages loaded successfully!
${LOGIN_FAIL}             Invalid Tracking ID or Password
${REJECTION_SUCCESS}      marked as rejected
${SUCCESS_PREFIX}         Stage
${SUCCESS_SUFFIX}         marked as done
${PENDING_SUCCESS}        marked as pending